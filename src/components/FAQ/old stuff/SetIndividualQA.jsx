/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('app'));

function AList({ a }) {
  // console.log(a, ' a');
  const { photos, body, answerer_name, id, helpfulness } = a[1];
  const [helpful, setHelpfulness] = useState(helpfulness);
  const [uniqClick, setUniClick] = useState(true);
  const [reported, setReported] = useState(false);
  function handleClick(clickId, reportType) {
    if (uniqClick) {
      axios.put(`/qa/answers/${clickId}/${reportType}`);
      if (reportType === 'helpful') {
        setHelpfulness(helpful + 1);
      } else {
        setReported(true);
      }
      setUniClick(false);
    }
  }
  let { date } = a[1];
  date = new Date(date).toDateString();

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
    <div className="answer">
      <p>{body}</p>
      <div className="thumbnail">
        {photos
          ? photos.map((link) => (
              <>
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
              </>
            ))
          : null}
      </div>
      <sub className="author">
        by:
        {answerer_name} | <time dateTime={date}>{date}</time> | Helpfulness: |
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleClick(id, 'helpful');
          }}
        >
          {' '}
          Yes{' '}
        </a>{' '}
        ({helpful}) |{' '}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleClick(id, 'report');
          }}
        >
          {' '}
          {reported ? 'Reported' : 'Report'}
        </a>
      </sub>
    </div>
  );
}

function Buttons({ click, setClick }) {
  const MoreText = 'Show more answers';
  const LessText = 'Collapse answers';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setClick(!click);
      }}
    >
      {click ? LessText : MoreText}
    </button>
  );
}
export default function SetIndividualq({ question }) {
  // console.log(question, ' ind');
  // eslint-disable-next-line react/destructuring-assignment
  const answers = Object.entries(question.answers);
  const [clicked, setClick] = useState(false);
  const numOfAns = answers.length;
  const sortedAnswers = answers
    .sort((a, b) => a[1].helpfulness - b[1].helpfulness)
    .reverse(); // sort answers by helpfulness
  const renderAnswers = sortedAnswers.slice(0, 2);

  const [helpful, setHelpfulness] = useState(question.question_helpfulness);
  const [uniqClick, setUniClick] = useState(true);
  const [reported, setReported] = useState(false);
  function handleClick(clickId, reportType) {
    if (uniqClick) {
      axios.put(`/qa/questions/${clickId}/${reportType}`);
      if (reportType === 'helpful') {
        setHelpfulness(helpful + 1);
      } else {
        setReported(true);
      }
      setUniClick(false);
    }
  }
  return (
    <>
      <div>
        Q:
        <div>{question.question_body}</div>
        <sub className="question">
          | Helpful? |
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleClick(question.question_id, 'helpful');
            }}
          >
            {' '}
            Yes{' '}
          </a>{' '}
          ({helpful}) |{' '}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleClick(question.question_id, 'report');
            }}
          >
            {' '}
            {reported ? 'Reported' : 'Report'}
          </a>
        </sub>
      </div>
      <div>
        A:
        <div>
          {(clicked ? sortedAnswers : renderAnswers).map((a) => (
            <AList a={a} key={a[0]} />
          ))}
        </div>
        {numOfAns > 2 ? <Buttons setClick={setClick} click={clicked} /> : null}
        
      </div>
    </>
  );
}
