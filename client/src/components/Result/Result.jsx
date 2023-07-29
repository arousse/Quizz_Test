/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps*/
import { useState, useEffect } from 'react';

import './Result.scss';
import httpService from '../../utils/http-service';

// eslint-disable-next-line react/prop-types
const Result = ({ rightAnswersNumber, numOfQuestions }) => {
  const [getStatistic, setStatistic] = useState();

  useEffect(() => {
    httpService
      .getJSON(`api/statistic/user/${sessionStorage.getItem('userid')}`, {})
      .then((response) => response.json())
      .then((data) => {
        setStatistic(data);
      });
  }, []);

  // source for function https://plainenglish.io/blog/how-to-find-the-most-frequent-element-in-an-array-in-javascript-c85119dc78d2
  function getMostFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b] ? a : b));
  }

  function resultText() {
    let storedNumberOfRightAnswers = 0;
    let worstDomain = [];
    let toLearnDomain;
    getStatistic.forEach((entry) => {
      if (entry.numRightAnswer > entry.numWrongAnswer) {
        storedNumberOfRightAnswers += 1;
      }
      if (entry.numRightAnswer < entry.numWrongAnswer) {
        worstDomain.push(entry.dbType);
      }
    });

    const domain = getMostFrequent(worstDomain);

    if (domain === 'FIB') {
      toLearnDomain = 'Lücken Text';
    } else if (domain === 'MCQ') {
      toLearnDomain = 'Multiple Choice';
    } else if (domain === 'SCQ') {
      toLearnDomain = 'Single Choice';
    } else if (domain === 'category') {
      toLearnDomain = 'Kategorien';
    } else if (domain === 'sort') {
      toLearnDomain = 'Sortieren';
    }

    if (storedNumberOfRightAnswers / getStatistic.length < rightAnswersNumber / numOfQuestions) {
      return (
        <p>
          Sehr gut, du hast heute mehr Fragen richtig beantwortet als im Durchschnitt. Möchtest du
          dich weiter verbessern, dann probiere doch eine weitere Kategorie aus. Übung brauchst du
          noch in {toLearnDomain}.
        </p>
      );
    }
    if (storedNumberOfRightAnswers / getStatistic.length > rightAnswersNumber / numOfQuestions) {
      return (
        <p>
          Schade, du hast heute weniger Fragen richtig beantwortet als im Durchschnitt. Möchtest du
          dich weiter verbessern, dann probiere doch eine weitere Kategorie aus. Übung brauchst du
          noch in {toLearnDomain}.
        </p>
      );
    }

    return (
      <p>
        Du liegst heute genau im Durchschnitt. Möchtest du dich weiter verbessern, dann probiere
        doch eine weitere Kategorie aus. Übung brauchst du noch in {toLearnDomain}.
      </p>
    );
  }

  function redirectToHome() {
    window.location.replace('http://localhost:3000');
  }

  return (
    <div className="background">
      <div className="result quiz-container">
        <h3>Ergebnis</h3>
        <p>
          Gestellte Fragen: <span>{numOfQuestions}</span>
        </p>
        <p>
          Richtige Antworten: <span>{rightAnswersNumber}</span>
        </p>
        {getStatistic ? resultText() : ''}
        <button onClick={redirectToHome}>Zur Übersicht</button>
      </div>
    </div>
  );
};

export default Result;
