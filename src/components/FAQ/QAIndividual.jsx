import React from 'react';

export default function QAIndividual(question) {
  console.log(question.answers, ' inside QAInd');
  const counter = Object.keys(question.answers).length;
  const answers = Object.entries(question.answers);
  console.log(answers, ' answers');
  return (
    <>
      <h1>Q: {question.question_body}</h1>
      {answers.map((answer) => (
        <div key={answer[0]}>
          <h3>A: {answer[1].body}</h3>
          <br />
          {answer[1].photos
            ? answer[1].photos.map((link) => (
                <img src={link} alt="answer pic" />
              ))
            : null}
          <h6>
            by: {answer[1].answerer_name} {answer[1].date} helpfulness:{' '}
            {answer[1].helpfulness}
          </h6>
        </div>
      ))}
    </>
  );
}

// (
//   <img src={link} alt="answer pic"></img>
// )
