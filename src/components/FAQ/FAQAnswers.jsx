import React from 'react';
import Modal from 'react-modal';
import FAQLinks from './FAQLinks';
import FAQForm from './FAQForm';

Modal.setAppElement(document.getElementById('app'));

export default function Answers({ answer }) {
  const ansProp = { isQ: false, id: answer.id, help: answer.helpfulness };
  const date = new Date(answer.date).toDateString();
  // console.log(answer);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="FAQAnswer">
      {answer.body}
      <br />
      {answer.photos
        ? answer.photos.map((link) => (
            <div key={`${Math.random() * 10}MI`}>
              <button className="FAQModalANS" type="button" onClick={openModal}>
                <img
                  style={{ width: '150px' }}
                  src={link}
                  alt="thumbnail answer img"
                  loading="lazy"
                />
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Enlarged Img"
              >
                <img src={link} alt="answer pic" />
                <br />
                <button
                  className="FAQModalANS"
                  type="button"
                  onClick={closeModal}
                >
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
        className="FAQModalANS"
        type="button"
        onClick={(e) => {
          e.preventDefault;
          openModal();
        }}
      >
        Add Answer
      </button>
      <FAQForm data={{ formType: 'answers', itemId: answer.id }} />
      <br />
    </div>
  );
}
