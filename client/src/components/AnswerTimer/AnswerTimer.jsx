/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { React, useEffect, useRef, useState } from 'react';

import './AnswerTimer.scss';

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setprogressLoaded] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 0.1);
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setprogressLoaded(100 * (counter / duration));

    if (counter >= duration) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        onTimeUp();
      }, 100);
    }
  }, [counter]);

  return (
    <div className="answer-timer-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40 ? 'lightgreen' : progressLoaded < 70 ? 'orange' : 'red'
          }`
        }}
        className="progress"
      ></div>
    </div>
  );
}

export default AnswerTimer;
