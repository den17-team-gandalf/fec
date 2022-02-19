import React from 'react';
import QAList from './QAList';
import useGetinfo from './useGetInfo';

const QuestionAndAnswerData = React.createContext();
export const QuestionAndAnswerConsumer = QuestionAndAnswerData.Consumer;
export default function questions() {
  const data = useGetinfo();
  const height = document.documentElement.clientHeight;

  return (
    <div
      style={{
        maxHeight: `${height / 2}px`,
        overflow: 'auto',
      }}
    >
      <h1>Q&A</h1>
      {data ? (
        <QAList data={data} />
      ) : (
        <div
          style={{
            maxHeight: `${height / 2}px`,
          }}
        />
      )}
    </div>
  );
}

/*

const markHelpful = (e, id, updateHelpfulness, unUsed) => {
  // console.log(id, unUsed);
  if (unUsed.flag) {
    axios.put(`/reviews/${id}/helpful`)
      .then(() => {
        updateHelpfulness((x) => x + 1);
        // eslint-disable-next-line no-param-reassign
        unUsed.flag = false;
        // e.target.childNodes[0].nodeValue = Number(e.target.text)
      })
      .catch((err) => {
        throw err;
      });
  }
};

*/
