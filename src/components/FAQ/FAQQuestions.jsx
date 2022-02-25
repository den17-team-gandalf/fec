import React, { useState } from 'react';
import FAQLinks from './FAQLinks';
import Answers from './FAQAnswers';

export default function Questions({ question }) {
  const answers = Object.entries(question.answers);
  const [preview, setPreview] = useState(true);
  const previewList = answers.slice(0, 2);
  const quesProp = {
    isQ: true,
    id: question.question_id,
    help: question.question_helpfulness,
  };

  // console.log(question);
  if (!preview) {
    return (
      <div>
        {question.question_body}
        <br />
        <FAQLinks entry={quesProp} />
        <br />
        <div className="FAQanswers">
          A:
          {answers.map((a) => (
            <Answers answer={a[1]} key={`${Math.random() * 1000}Q2`} />
          ))}
          <button
            className="FAQModalQUE"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setPreview(!preview);
            }}
          >
            Collapse answers
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      {question.question_body}
      <br />
      <FAQLinks entry={quesProp} />
      <br />
      <div className="FAQAnswers">
        A:
        {previewList.map((a) => (
          <Answers
            className="FAQanswer"
            key={`${Math.random() * 10}AAP`}
            answer={a[1]}
          />
        ))}
        {answers.length >= 2 && (
          <button
            className="FAQModalQUE"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setPreview(!preview);
            }}
          >
            Show more answers
          </button>
        )}
      </div>
    </div>
  );
}
