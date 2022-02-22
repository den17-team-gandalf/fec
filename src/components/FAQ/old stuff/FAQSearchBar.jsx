import React, { useEffect, useState } from 'react';

export default function FAQSearchBar() {
  const [searchInput, setSearchInput] = useState('');
  useEffect(
    () => {
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
    }
    [searchInput]
  );
  return (
    <form>
      <input
        type="text"
        id="search"
        placeholder="Have a question? Search for answers…"
        value={searchInput}
        onChange={(e)=>{}}
        size="60"
      />
      <br />
    </form>
  );
}
