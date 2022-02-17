import React, { useState } from 'react';

export default function QAIndividual(answers) {
  //try
  const counter = Object.keys(answers).length;
  const answersArr = Object.entries(answers)
    .sort((a, b) => a[1].helpfulness - b[1].helpfulness)
    .reverse(); // sort answers by helpfulness

  const [count, setCount] = useState(2);
  const answersList = answersArr.slice(0, count);
  return (
    <>
      <p> A:</p>
      {answersList.map((answerIn) => (
        <div key={answerIn[0]}>
          <p style={{ fontStyle: 'italic' }}>{answerIn[1].body}</p>
          {answerIn[1].photos
            ? answerIn[1].photos.map((link) => (
                <a
                  target="_blank"
                  href={link}
                  rel="noreferrer"
                  style={{ margin: '0' }}
                >
                  <img src={link} alt="answer pic" style={{ width: '150px' }} />
                </a>
              ))
            : null}
          <sub>
            by:
            {answerIn[1].answerer_name}
            {answerIn[1].date}
            helpfulness: Yes
            {answerIn[1].helpfulness}
          </sub>
        </div>
      ))}
      {counter < count ? null : counter > count ? (
        <button type="button" onClick={() => setCount(counter)}>
          Show more answers
        </button>
      ) : (
        <button type="button" onClick={() => setCount(2)}>
          Collapse answers
        </button>
      )}
    </>
  );
}
