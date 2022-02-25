import React, { useEffect, useState } from 'react';
import FAQFetchList from './FAQFetchList';
import FAQList from './FAQList';
// import contexts from '../contexts';

export default function FAQWidget() {
  // const { currentProduct } = React.useContext(contexts.AppContext);
  const data = FAQFetchList();
  const windowSize = {
    width: window.innerWidth,
    maxHeight: window.innerHeight,
    overflow: 'auto',
  };
  const [searchInput, setSearchInput] = useState('');
  const [searchResultList, setSearchResult] = useState(null);

  return (
    <>
      <div className="FAQTitle">
        <h2>Questions Answers</h2>
        <FAQSearchBar />
      </div>
      <div style={windowSize} className="FAQList">
        <div>
          {data ? (
            <FAQList key={`${Math.random() * 10}FAQListOG`} data={data} />
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

function FAQSearchBar() {
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
  return (
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
  );
}
