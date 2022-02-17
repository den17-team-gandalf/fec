import React from 'react';
import QAList from './QAList';
import Data from '../../dummyData';

const QuestionAndAnswerData = React.createContext();
export const QuestionAndAnswerConsumer = QuestionAndAnswerData.Consumer;
export default function questions() {
  // const [height, setHeight] = useState(document.documentElement.clientHeight);
  const height = document.documentElement.clientHeight;

  // useEffect(
  //   () => setHeight(document.documentElement.clientHeight),
  //   [
  //     window.addEventListener('resize', () => {
  //       console.log('resize');
  //     }),
  //   ]
  // );

  return (
    <QuestionAndAnswerData.Provider value={Data}>
      <div
        style={{
          maxHeight: `${height / 2}px`,
          overflow: 'auto',
          maxWidth: `${document.documentElement.clientWidth / 2}px`,
        }}
      >
        <h1>Q&A</h1>
        <QAList />
      </div>
    </QuestionAndAnswerData.Provider>
  );
}
