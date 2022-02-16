import React from 'react';
import stuff from '../../dummyData';
import QAIndividual from './QAIndividual';

export default function QAList() {
  return (
    <>
      {stuff.questions.results.map((question) => (
        <div key={question.question_id.toString()}>
          <h3>Q: {question.question_body}</h3>
          {QAIndividual(question.answers)}
        </div>
      ))}
    </>
  );
}

/*
create a state keeping track of how many reviews to render
create state to keep track if "more review" needs to still render
create function to update list with 2 more answers
check to see if the height of list takes up full screen
if more entries after full screen keep rending more reviews but now it scrolls
check if end of list if true remove button

document.documentElement.clientHeight
*/
