import axios from 'axios';
import React, { useState } from 'react';

export default function FAQLinks({ entry }) {
  const { isQ, id, help } = entry;
  // console.log(isQ, id, help);
  const [helpful, setHelpfulness] = useState(help);
  const [uniqClick, setUniClick] = useState(true);
  const [reported, setReported] = useState(false);
  const type = isQ ? 'questions' : 'answers';
  function handleClick(query, item, reportType) {
    if (uniqClick) {
      axios.put(`/qa/${query}/${item}/${reportType}`);
      if (reportType === 'helpful') {
        setHelpfulness(helpful + 1);
      } else {
        setReported(true);
      }
      setUniClick(false);
    }
  }
  return (
    <sub>
      | Helpful? |
      <a
        className="FAQLinks"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          handleClick(type, id, 'helpful');
        }}
      >
        {' '}
        Yes{' '}
      </a>{' '}
      ({helpful}) |{' '}
      <a
        className="FAQLinks"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          handleClick(type, id, 'report');
        }}
      >
        {' '}
        {reported ? 'Reported' : 'Report'}
      </a>
    </sub>
  );
}
