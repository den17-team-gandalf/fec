import React, { useState } from 'react';
import Modal from 'react-modal';
import FAQLinks from './FAQLinks';
import FAQForm from './FAQForm';

Modal.setAppElement(document.getElementById('app'));
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Answers({ answer }) {
  const ansProp = { isQ: false, id: answer.id, help: answer.helpfulness };
  const date = new Date(answer.date).toDateString();
  // console.log(answer);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {answer.body}
      <br />
      {answer.photos
        ? answer.photos.map((link) => (
            <div key={`${Math.random() * 10}MI`}>
              <button
                type="button"
                onClick={openModal}
                style={{
                  display: 'inline-block',
                  border: 'none',
                  padding: '1rem 2rem',
                  margin: '0',
                  textDecoration: 'none',
                  background: '#ffffff',
                  color: '#ffffff',
                  fontFamily: 'sans-serif',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <img
                  style={{ width: '150px' }}
                  src={link}
                  alt="thumbnail answer img"
                  loading="lazy"
                />
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Enlarged Img"
              >
                <img src={link} alt="answer pic" />
                <br />
                <button type="button" onClick={closeModal}>
                  close
                </button>
              </Modal>
            </div>
          ))
        : null}
      <br />
      <sub>
        by:
        {answer.answerer_name} |<time dateTime={date}> {date} </time>
      </sub>
      <FAQLinks entry={ansProp} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault;
          openModal();
        }}
      >
        Add Answer
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="questionForm"
      >
        <FAQForm data={{ formType: 'answers', itemId: answer.id }} />
      </Modal>
      <br />
    </>
  );
}
function Questions({ question }) {
  const answers = Object.entries(question.answers);
  const [preview, setPreview] = useState(true);
  const previewList = answers.slice(0, 2);
  const quesProp = {
    isQ: true,
    id: question.question_id,
    help: question.question_helpfulness,
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  // console.log(question);
  if (!preview) {
    return (
      <>
        {question.question_body}
        <br />
        <FAQLinks entry={quesProp} />
        <br />
        A:
        {answers.map((a) => (
          <Answers answer={a[1]} key={`${Math.random() * 1000}Q2`} />
        ))}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setPreview(!preview);
          }}
        >
          Collapse answers
        </button>
      </>
    );
  }
  return (
    <>
      {question.question_body}
      <br />
      <FAQLinks entry={quesProp} />
      <br />
      A:
      {previewList.map((a) => (
        <Answers key={`${Math.random() * 10}AAP`} answer={a[1]} />
      ))}
      {answers.length >= 2 && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setPreview(!preview);
          }}
        >
          Show more answers
        </button>
      )}
    </>
  );
}

export default function FAQList({ data }) {
  const productId = data.product_id;
  const list = data.results;
  // console.log(data)
  const [questionCount, setQuestionCount] = useState(2);
  const currentList = list.slice(0, questionCount);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // console.log(productId);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {currentList.map((q) => (
        <div key={Math.random() * 100}>
          Q:
          <div>
            <Questions question={q} />
          </div>
        </div>
      ))}
      {list.length > 2 && (
        <button
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault;
          openModal();
        }}
      >
        Add Question
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="questionForm"
      >
        <FAQForm
          data={{
            formType: 'question',
            productId: productId,
          }}
        />
      </Modal>
    </>
  );
}
