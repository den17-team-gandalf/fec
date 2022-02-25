import React, { useState } from 'react';
import FAQForm from './FAQForm';
import Questions from './FAQQuestions';
import contexts from '../contexts';

export default function FAQList({ data }) {
  const { currentProduct } = React.useContext(contexts.AppContext);
  const productId = currentProduct;
  // console.log(data, ' data');
  const list = data.results;
  // console.log(data, ' data');
  const [questionCount, setQuestionCount] = useState(2);
  const currentList = list?.slice(0, questionCount);
  // console.log(currentList, ' list');
  if (currentList === undefined) {
    return <div>No Results Found</div>;
  }
  return (
    <div className="FAQStart">
      {currentList?.map((q) => (
        <div className="FAQQuestions" key={Math.random() * 100}>
          <div>
            <strong> Q: </strong>
            <Questions question={q} />
          </div>
        </div>
      ))}
      {list?.length > 2 && (
        <button
          className="FAQModalLIST"
          onClick={(e) => {
            e.preventDefault();
            if (questionCount < list.length) {
              setQuestionCount(questionCount + 2);
            }
          }}
          type="button"
        >
          More Questions
        </button>
      )}
      <FAQForm
        data={{
          formType: 'question',
          productId: productId,
        }}
      />
    </div>
  );
}
