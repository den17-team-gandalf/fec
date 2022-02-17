import React, { useState, useEffect } from 'react';
import stuff from '../../dummyData';
import QAIndividual from './QAIndividual';

function SearchBar({ search }) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (searchInput.length >= 3) {
    }
  }, [searchInput]);

  return (
    <form
      onSubmit={() => {
        search;
        searchInput = '';
      }}
    >
      <input
        type="text"
        id="search"
        placeholder="Search for your answer"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="button">Search</button>
    </form>
  );
}

export default function QAList() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0]);
  };
  return (
    <>
      <SearchBar search={handleSubmit} />
      {stuff.questions.results.map((question) => (
        <div key={question.question_id.toString()}>
          <h3>
            Q:
            {console.log(question.question_id.toString())}
            {question.question_body}
          </h3>
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
