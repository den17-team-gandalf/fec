/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import SetIndividualQ from './SetIndividualQA';

export default function QAList({ data }) {
  const { results } = data;
  // console.log(results, product_id);
  const [renderList, setRenderList] = useState(results);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    if (searchInput.length >= 3) {
      let searchResult = renderList.map((q) => {
        if (
          q.question_body.toLowerCase().indexOf(searchInput.toLowerCase()) !==
          -1
        ) {
          return q;
        }
        return undefined;
      });
      searchResult = searchResult.filter((x) => x !== undefined);
      setRenderList(searchResult);
    } else {
      setRenderList(results);
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
          onChange={(e) => {
            e.preventDefault();
            setSearchInput(e.target.value);
          }}
          size="60"
        />
      </form>
      {renderList.map((q) => (
        <SetIndividualQ key={q.question_id} question={q} />
      ))}
    </>
  );
}
