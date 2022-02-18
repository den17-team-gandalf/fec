/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function AList({ a }) {
  return (
    <div className="answer">
      <p>{a[1].body}</p>
      <div className="thumbnail">
        {a[1].photos
          ? a[1].photos.map((link) => (
              <a key={link} target="_blank" href={link} rel="noreferrer">
                <img src={link} alt="answer pic" style={{ width: '150px' }} />
              </a>
            ))
          : null}
      </div>
      <sub className="author">
        by:
        {a[1].answerer_name} | {a[1].date} | helpfulness: |<a href="#"> Yes </a>{' '}
        ({a[1].helpfulness}) | <a href="#"> Report</a>
      </sub>
    </div>
  );
}

function Buttons({ click, setClick }) {
  const MoreText = 'Show more answers';
  const LessText = 'Collapse answers';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setClick(!click);
      }}
    >
      {click ? LessText : MoreText}
    </button>
  );
}

export default function SetIndividualItem({ item }) {
  // eslint-disable-next-line react/destructuring-assignment
  const answers = Object.entries(item.answers);
  const [clicked, setClick] = useState(false);
  const numOfAns = answers.length;
  const sortedAnswers = answers
    .sort((a, b) => a[1].helpfulness - b[1].helpfulness)
    .reverse(); // sort answers by helpfulness
  const renderAnswers = sortedAnswers.slice(0, 2);
  return (
    <>
      <div>
        Q:
        <div>{item.question_body}</div>
      </div>
      <div>
        A:
        <div>
          {(clicked ? sortedAnswers : renderAnswers).map((a) => (
            <AList a={a} key={a[0]} />
          ))}
        </div>
        {numOfAns > 2 ? <Buttons setClick={setClick} click={clicked} /> : null}
      </div>
    </>
  );
}
