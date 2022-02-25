import React, { useEffect, useState } from 'react';
import FAQFetchList from './FAQFetchList';
import FAQList from './FAQList';
import contexts from '../contexts';

export default function FAQWidget() {
  console.log(React.useContext(contexts.DetailsContext));
  const data = FAQFetchList();
  const [searchResultList, setSearchResult] = useState('');
  const windowSize = {
    margin: 'auto',
    width: window.innerWidth,
    maxHeight: window.innerHeight,
    overflow: 'auto',
  };

  // console.log(searchResultList, ' sreachlist');
  return (
    <>
      <div className="FAQTitle">
        <h2>Questions Answers</h2>
        <FAQSearchBar data={[data, setSearchResult]} />
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

function FAQSearchBar({ data }) {
  const [list, func] = data;
  // console.log(data, ' search');
  const [searchInput, setSearchInput] = useState('');
  // const [searchOutput, setSearchInput] = useState(false);
  // if(searchInput)

  // useEffect(() => {
  //   if (searchInput.length >= 3) {
  //     let searchResult = list.results.map((q) => {
  //       if (
  //         q.question_body.toLowerCase().indexOf(searchInput.toLowerCase()) !==
  //         -1
  //       ) {
  //         return q;
  //       }
  //       return undefined;
  //     });
  //     searchResult = searchResult.filter((x) => x !== undefined);
  //     func(searchResult);
  //   } else {
  //     func(null);
  //   }
  // }, [searchInput]);
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
