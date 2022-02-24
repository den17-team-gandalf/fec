/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

export default function FAQForm({ data }) {
  const { formType, productId } = data;
  const [userInput, setUserInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // console.log(userInput.length, nameInput, emailInput);
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

  function handleClick(type, id) {
    axios.post('/qa/questions', {
      body: userInput,
      name: nameInput,
      email: emailInput,
      product_id: id,
    });
    setEmailInput('');
    setNameInput('');
    setUserInput('');
  }
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
        <form>
          <label>
            {formType === 'answers' ? (
              <div>
                Submit Your Answer:
                <br />
                {/* <sub>{`${productData.name}: ${data.questionBody}`}</sub> */}
              </div>
            ) : (
              <div>
                Ask Your Question:
                <br />
                <sub>About this item:</sub>
              </div>
            )}
            <textarea
              rows="6"
              cols="50"
              type="text"
              name=""
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <br />
            {userInput.length}
            /1000
          </label>
          <br />
          <label>
            Nickname:
            <br />
            <input
              type="text"
              name="NickName"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <br />
            {nameInput.length}
            /60
          </label>
          <br />
          <label>
            Email:
            <br />
            <input
              type="email"
              placeholder="jack@email.com"
              name="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <br />
            <sub> For authentication reasons, you will not be emailed</sub>
          </label>
          <br />
          {formType === 'ans' ? (
            <input type="button" name="Upload Photo" value="Upload Photo" />
          ) : null}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClick(formType, productId);
              closeModal();
            }}
            type="button"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

/*

This error will occur if:
Any mandatory fields are blank
The email address provided is not in correct email format
The images selected are invalid or unable to be uploaded.

question model
question email nickname
*/
