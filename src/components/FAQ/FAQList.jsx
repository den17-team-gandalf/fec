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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setPreview(!preview);
        }}
      >
        Show more answers
      </button>
    </>
  );
}

export default function FAQList({ list }) {
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
      {list.map((q) => (
        <div key={Math.random() * 100}>
          Q:
          <div>
            <Questions question={q} />
          </div>
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
            <FAQForm data={{ formType: 'question', itemId: q.question_id }} />
          </Modal>
        </div>
      ))}
    </>
  );
}
