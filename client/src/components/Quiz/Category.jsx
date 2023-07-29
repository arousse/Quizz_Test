/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Countdown from 'react-countdown';

import httpService from '../../utils/http-service';

import './Category.scss';

import DragAndDrop from './DragAndDrop'; // Import the DragAndDrop component
import Result from '../Result/Result';

const Category = () => {
  const [questionsCategory, setQuestions] = useState([]);
  const [getCounter, setCounter] = useState(0);
  let [getResult, setResult] = useState(null);
  let [getStartTime, setStartTime] = useState();
  let [getQuizEnd, setQuizEnd] = useState(false);
  let [getRightAnswers, setRightAnswers] = useState(0);
  const [getTimeOver, setTimeOver] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    httpService
      .getJSON('api/question', { domain: id, number: '10', type: 'FIB' })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
    setStartTime(new Date());
    sessionStorage.setItem('timer', Date.now());
  }, []);

  function updateStatistic(res, endTime) {
    const time = Math.abs(getStartTime.getTime() - endTime.getTime()) / 1000;
    if (res.result === 'correct') {
      setRightAnswers(getRightAnswers + 1);
    }
    const body = {
      userId: sessionStorage.getItem('userid'),
      isCorrect: res.result === 'correct' ? 'true' : 'false',
      time: time, // TODO: Zeit messen für die Beantwortung der Frage.
      domain: res.domain,
      type: questionsCategory[getCounter].type
    };
    httpService
      .patchJSON(`api/statistic/${questionsCategory[getCounter]._id}`, body)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Can not update statistic');
        }
      });
  }

  function validateAnswer(data, question, e) {
    const endTime = new Date();
    httpService
      .postJSON(`api/question/${question._id}`, { answer: data, items: question.answers })
      .then((response) => response.json())
      .then((res) => {
        setResult(res);
        if (question.type === 'SCQ') {
          for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].checked) {
              if (res.correctAnswer.includes(e.target.elements[i].value)) {
                document
                  .querySelector(`[for="${e.target.elements[i].id}"]`)
                  .classList.add('correct');
              } else {
                document
                  .querySelector(`[for="${e.target.elements[i].id}"]`)
                  .classList.add('incorrect');
              }
            } else {
              if (res.correctAnswer.includes(e.target.elements[i].value)) {
                document
                  .querySelector(`[for="${e.target.elements[i].id}"]`)
                  .classList.add('correct');
              }
            }
          }
        }
        if (question.type === 'MCQ') {
          for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].checked) {
              if (res.correctAnswer.includes(e.target.elements[i].value)) {
                document
                  .querySelector(`[for="${e.target.elements[i].id}"]`)
                  .classList.add('correct');
              } else {
                document
                  .querySelector(`[for="${e.target.elements[i].id}"]`)
                  .classList.add('incorrect');
              }
            } else {
              if (res.correctAnswer.includes(e.target.elements[i].value)) {
                document
                  .querySelector(`[for="${e.target.elements[i].id}"]`)
                  .classList.add('incorrect');
              }
            }
          }
        }
        updateStatistic(res, endTime);
      });
  }

  function addResultToDom() {
    if (!getResult) {
      return;
    }
    if (getResult.result === 'incorrect') {
      const fib = document.getElementsByClassName('final-result')[0];
      fib.classList.add('incorrect');
      const falsch = document.createElement('p');
      falsch.innerText = 'Die Antwort ist falsch, die richtige Antwort ist:';
      fib.appendChild(falsch);
      for (let i = 0; i < getResult.correctAnswer.length; i++) {
        const rightAnswer = document.createElement('span');
        rightAnswer.innerText = getResult.correctAnswer[i];
        fib.appendChild(rightAnswer);
      }
    }

    if (getResult.result === 'correct') {
      const fib = document.getElementsByClassName('final-result')[0];
      fib.classList.add('correct');
      const richtig = document.createElement('p');
      richtig.innerText = 'Die Antwort ist richtig';
      fib.appendChild(richtig);
    }

    if (getResult.result === 'partially-correct') {
      const fib = document.getElementsByClassName('final-result')[0];
      fib.classList.add('correct');
      const richtig = document.createElement('p');
      richtig.innerText = 'Die Antwort ist teilweise richtig. Die richtige Antwort ist:';
      fib.appendChild(richtig);
      for (let i = 0; i < getResult.correctAnswer.length; i++) {
        const rightAnswer = document.createElement('span');
        rightAnswer.innerText = getResult.correctAnswer[i];
        fib.appendChild(rightAnswer);
      }
    }
  }

  function next(e) {
    if (e.target.elements) {
      for (let i = 0; i < e.target.elements.length; i++) {
        if (e.target.elements[i].value) {
          e.target.elements[i].value = '';
        }
        if (e.target.elements[i].checked === true) {
          e.target.elements[i].checked = false;
        }
      }
      if (document.getElementsByClassName('final-result')[0]) {
        const resultContainer = document.getElementsByClassName('final-result')[0];
        resultContainer.innerHTML = '';
      }
      const removeClassLable = document.querySelectorAll('label');

      for (let i = 0; i < removeClassLable.length; i++) {
        removeClassLable[i].classList.remove('correct');
        removeClassLable[i].classList.remove('incorrect');
      }
    }
    setResult(null);

    if (getCounter === questionsCategory.length - 1) {
      return setQuizEnd(true);
    }
    setCounter(getCounter + 1);
  }

  function mapAnswer(e) {
    e.preventDefault();
    const buttonText = document.querySelector('[type="submit"]');
    if (buttonText.innerText === 'Nächste Frage') {
      return next(e);
    }
    const question = questionsCategory[getCounter];

    if (question.type === 'FIB' || question.type === 'SCQ') {
      const data = e.target.elements.answer.value;
      validateAnswer([data], question, e);
    }

    if (question.type === 'MCQ') {
      const data = [];
      for (let i = 0; i < e.target.elements.length; i++) {
        if (e.target.elements[i].checked) {
          data.push(e.target.elements[i].value);
        }
      }
      validateAnswer(data, question, e);
    }
  }

  function addQuestionToDom() {
    const question = questionsCategory[getCounter];
    if (question.type === 'MCQ') {
      return mcq(question);
    }
    if (question.type === 'SCQ') {
      return scq(question);
    }
    if (question.type === 'FIB') {
      return fib(question);
    }

    if (question.type === 'category') {
      return (
        <DragAndDrop
          next={mapAnswer}
          answers={question.answers}
          categories={question.categories}
          question={question.question}
          _id={question._id}
        />
      );
    }

    if (question.type === 'sort') {
      return (
        <DragAndDrop
          next={mapAnswer}
          answers={question.answers}
          categories={question.categories}
          question={question.question}
          _id={question._id}
        />
      );
    }
  }

  function mcq(questionObj) {
    return (
      <form onSubmit={mapAnswer} className="checkbox">
        <fieldset>
          <p>{questionObj.question}</p>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="answer0">
              {questionObj.answers[0]}
              <input
                type="checkbox"
                id="answer0"
                name={questionObj.answers[0]}
                value={questionObj.answers[0]}
              />
            </label>
            <label htmlFor="answer1">
              {questionObj.answers[1]}
              <input
                type="checkbox"
                id="answer1"
                name={questionObj.answers[1]}
                value={questionObj.answers[1]}
              />
            </label>
            <label htmlFor="answer2">
              {questionObj.answers[2]}
              <input
                type="checkbox"
                id="answer2"
                name={questionObj.answers[2]}
                value={questionObj.answers[2]}
              />
            </label>
            <label htmlFor="answer3">
              {questionObj.answers[3]}
              <input
                type="checkbox"
                id="answer3"
                name={questionObj.answers[3]}
                value={questionObj.answers[3]}
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          {getResult ? (
            <button type="submit">Nächste Frage</button>
          ) : (
            <button type="submit">Weiter</button>
          )}
        </fieldset>
      </form>
    );
  }

  function scq(questionObj) {
    return (
      <form onSubmit={mapAnswer} className="checkbox">
        <fieldset>
          <p>{questionObj.question}</p>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="answer0">
              {questionObj.answers[0]}
              <input type="radio" id="answer0" name="answer" value={questionObj.answers[0]} />
            </label>
            <label htmlFor="answer1">
              {questionObj.answers[1]}
              <input type="radio" id="answer1" name="answer" value={questionObj.answers[1]} />
            </label>
            <label htmlFor="answer2">
              {questionObj.answers[2]}
              <input type="radio" id="answer2" name="answer" value={questionObj.answers[2]} />
            </label>
            <label htmlFor="answer3">
              {questionObj.answers[3]}
              <input type="radio" id="answer3" name="answer" value={questionObj.answers[3]} />
            </label>
          </div>
        </fieldset>
        <fieldset>
          {getResult ? (
            <button type="submit">Nächste Frage</button>
          ) : (
            <button type="submit">Weiter</button>
          )}
        </fieldset>
      </form>
    );
  }

  function fib(questionObj) {
    let splitedQuestion = questionObj.question;
    if (questionObj.question.match('_______')) {
      splitedQuestion = questionObj.question.split('_______');
    }

    if (typeof splitedQuestion === 'string') {
      return (
        <form onSubmit={mapAnswer}>
          <fieldset>
            <label htmlFor="answer">{splitedQuestion}</label>
          </fieldset>
          <fieldset>
            <input type="text" id="answer" />
          </fieldset>
          <fieldset>
            {getResult ? (
              <button type="submit">Nächste Frage</button>
            ) : (
              <button type="submit">Weiter</button>
            )}
          </fieldset>
        </form>
      );
    }
    return (
      <form onSubmit={mapAnswer}>
        <fieldset>
          <label>{splitedQuestion[0]}</label>
          <input type="text" />
          <p>{splitedQuestion[1]}</p>
        </fieldset>
        <fieldset>
          {getResult ? (
            <button type="submit">Nächste Frage</button>
          ) : (
            <button type="submit">Weiter</button>
          )}
        </fieldset>
      </form>
    );
  }

  function onTime({ hours, minutes, seconds, completed }) {
    if (completed) {
      setTimeOver(true);
      return <span>0</span>;
    }
    return <span>{seconds}</span>;
  }

  function quizComponent() {
    return (
      <div className="background">
        <div className="quiz-container">
          <div>
            <span>Timer: </span>
            <Countdown date={Number(sessionStorage.getItem('timer')) + 10000} renderer={onTime} />
          </div>
          <span>
            Frage {getCounter + 1}/{questionsCategory.length}
          </span>
          {addQuestionToDom()}
          <div className="final-result"></div>
          {addResultToDom()}
        </div>
      </div>
    );
  }

  return getQuizEnd || getTimeOver ? (
    <Result rightAnswersNumber={getRightAnswers} numOfQuestions={questionsCategory.length} />
  ) : questionsCategory.length > 0 ? (
    quizComponent()
  ) : (
    ''
  );
};

export default Category;
