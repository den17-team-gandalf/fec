import React, { useState, useRef } from 'react';
import QAList from './QAList';

export default function questions() {
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const ref = useRef(null);

  // useEffect(
  //   () => setHeight(document.documentElement.clientHeight),
  //   [
  //     window.addEventListener('resize', () => {
  //       console.log('resize');
  //     }),
  //   ]
  // );

  return (
    <div
      ref={ref}
      style={{
        maxHeight: `${height / 2}px`,
        overflow: 'auto',
        maxWidth: `${document.documentElement.clientWidth / 2}px`,
      }}
    >
      <h1>Q&A</h1>
      <form>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for your answer"
          value=""
        />
        <input type="submit" value="Submit" />
      </form>
      <QAList />
    </div>
  );
}
