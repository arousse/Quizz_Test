import React, { useEffect, useState } from "react";
import { resultInitialState } from "../../questions";
import "./Category.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";
import { useParams } from "react-router-dom";
import DragAndDrop from "./DragAndDrop"; 

const Category = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setinputAnswer] = useState("");

  const [questionsCategory, setQuestions] = useState(questions);

  const { question, choices, correctAnswer, type } = questions[currentQuestion];
  const params = useParams();

  useEffect(() => {
    const question_filter = questions.filter((q) => q.category === params.id);
    setQuestions(question_filter);
  }, []);

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setinputAnswer("");
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questionsCategory.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const handleInputChange = (evt) => {
    setinputAnswer(evt.target.value);

    if (evt.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }
    return (
      <ul>
        {choices.map((answer, index) => (
          <li
            onClick={() => onAnswerClick(answer, index)}
            key={answer}
            className={answerIdx === index ? "selected-answer" : null}
          >
            {answer}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && (
            <AnswerTimer duration={15} onTimeUp={handleTimeUp} />
          )}

          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">
            /{questionsCategory.length}
          </span>
          <h2>{question}</h2>

          {type === "CAT" ? (
            <DragAndDrop choices={choices} />
          ) : (
            getAnswerUI()
          )}

          <div className="footer">
            <button
              onClick={() => onClickNext(answer)}
              disabled={answerIdx === null && !inputAnswer}
            >
              {currentQuestion === questionsCategory.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result
          result={result}
          onTryAgain={onTryAgain}
          totalQuestions={questionsCategory.length}
        />
      )}
    </div>
  );
};

export default Category;
