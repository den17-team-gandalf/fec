import React from 'react';
import stuff from '../../dummyData';
import QAIndividual from './QAIndividual';

export default function QAList() {
  console.log(stuff.questions, ' inside QAlist');
  return (
    <>
      <div>text</div>
      {stuff.questions.results.map((question) => (
        <div key={question.question_id}>{QAIndividual(question)}</div>
      ))}
    </>
  );
}
