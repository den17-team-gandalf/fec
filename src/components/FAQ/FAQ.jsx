import React, { useEffect, useState } from 'react';
import FAQFetchList from './FAQFetchList';
import FAQList from './FAQList';

export default function FAQWidget() {
  const data = FAQFetchList();
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight / 2,
    overflow: 'auto',
  };
  const [searchInput, setSearchInput] = useState('');
  const [searchResultList, setSearchResult] = useState(null);
  useEffect(() => {
    if (searchInput.length >= 3) {
      let searchResult = data.results.map((q) => {
        if (
          q.question_body.toLowerCase().indexOf(searchInput.toLowerCase()) !==
          -1
        ) {
          return q;
        }
        return undefined;
      });
      searchResult = searchResult.filter((x) => x !== undefined);
      setSearchResult(searchResult);
    } else {
      setSearchResult(null);
    }
  }, [searchInput]);
  if (searchResultList) {
    return (
      <>
        <h1>Questions and Answers</h1>
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
          <br />
        </form>
        <div style={windowSize}>
          {data ? (
            <FAQList
              key={`${Math.random() * 10}FAQListSearch`}
              list={searchResultList}
            />
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </>
    );
  }
  return (
    <div style={windowSize}>
      <h1>Questions and Answers</h1>
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
        <br />
      </form>
      <div>
        {data ? (
          <FAQList key={`${Math.random() * 10}FAQListOG`} list={data.results} />
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
}
