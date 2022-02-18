/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { questions } from '../../dummyData';
import SetIndividualA from './SetIndividualQA';

export default function QAList() {
  const questionsList = questions.results;
  const [renderList, setRenderList] = useState(questionsList);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    if (searchInput.length >= 3) {
      let searchResult = questionsList.map((q) => {
        if (
          q.question_body.toLowerCase().indexOf(searchInput.toLowerCase()) !==
          -1
        ) {
          return q;
        }
      });
      searchResult = searchResult.filter((x) => x !== undefined);
      setRenderList(searchResult);
    } else {
      setRenderList(questionsList);
    }
  }, [searchInput]);
  return (
    <>
      <form>
        <input
          type="text"
          id="search"
          placeholder="Have a question? Search for answers…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      {renderList.map((q) => (
        <SetIndividualA item={q} key={q.question_id} />
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

// function SearchBar({ search }) {
//   const [searchInput, setSearchInput] = useState('');

//   useEffect(() => {
//     if (searchInput.length >= 3) {
//     }
//   }, [searchInput]);

//   return (
//     <form
//       onSubmit={() => {
//         search;
//         searchInput = '';
//       }}
//     >
//       <input
//         type="text"
//         id="search"
//         placeholder="Search for your answer"
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//       />
//       <button type="button">Search</button>
//     </form>
//   );
// }

// function AnswerList() {

//   return (
//   <>
//   stuff.questions.results.map((question) => (
//     <div key={question.question_id.toString()}>
//       <h3>
//         Q:
//         {console.log(question.question_id.toString())}
//         {question.question_body}
//       </h3>
//       {QAIndividual(question.answers)}
//     </div>
//   ))
//   </>
//   )
// }

// export default function QAList() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(e.target[0]);
//   };
//   return (
//     <>
//       <SearchBar search={handleSubmit} />
//       <AnswerList />
//     </>
//   );
// }
