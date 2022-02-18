/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';

function AList({ a }) {
  console.log(a);
  const { photos, body, answerer_name, id, helpfulness } = a[1];
  const [helpful, setHelpfulness] = useState(helpfulness);
  function handleHelpfulClick(id) {
    // axios.put()
    console.log(id, ' id inside helpful');
  }

  let { date } = a[1];
  date = new Date(date).toDateString();

  return (
    <div className="answer">
      <p>{body}</p>
      <div className="thumbnail">
        {photos
          ? photos.map((link) => (
              <a key={link} target="_blank" href={link} rel="noreferrer">
                <img src={link} alt="answer pic" style={{ width: '150px' }} />
              </a>
            ))
          : null}
      </div>
      <sub className="author">
        by:
        {answerer_name} | <time dateTime={date}>{date}</time> | helpfulness: |
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleHelpfulClick(id);
          }}
        >
          {' '}
          Yes{' '}
        </a>{' '}
        ({helpful}) | <a href="/"> Report</a>
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
    .sort((a, b) => a.helpfulness - b[1].helpfulness)
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
