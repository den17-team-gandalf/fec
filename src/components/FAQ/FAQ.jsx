import React from 'react';
import QAList from './QAList';

export default function questions() {
  return (
    <div>
      <h1>Q&A</h1>
      <div id="searchbar"> search bar</div>
      <QAList />
    </div>
  );
}
