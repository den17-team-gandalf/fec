/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import contexts from '../contexts';

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

export default function FAQForm({ data }) {
  const { formType, productId } = data;

  const [userInput, setUserInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // use context to pull name out
  const { products } = React.useContext(contexts.AppContext);
  const productData = products.find((item) => {
    if (item.id.toString() === productId) {
      return item.name;
    }
  });

  // console.log(formType, ' id2');
  function handleClick() {
    const sendData = {
      body: userInput,
      name: nameInput,
      email: emailInput,
      product_id: productId,
    };
    if (formType === 'questions') {
      axios.post('/qa/questions', sendData);
    } else {
      axios.post('/qa/questions', sendData);
    }
  }
  useEffect(() => {
    // if (userInput.length > 1000 && nameInput.length > 60) {
    //   setErrors(`Response needs ${1000 - userInput.length} more characters!`);
    // } else {
    //   setErrors('');
    // }
  }, [userInput, nameInput]);
  // if question get question to stick on top of answers
  // productData.find((q) => console.log(q));
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="FAQModalFORM"
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
        onRequestClose={closeModal}
        contentLabel="Enlarged Img"
      >
        <form>
          <label>
            {formType === 'answers' ? (
              <>
                Submit Your Answer:
                <br />
                <sub>{`${productData}: ${data.questionBody}`}</sub>
              </>
            ) : (
              <>
                {' '}
                Ask Your Question:
                <br />
                <sub>{`About the ${productData}:`}</sub>
              </>
            )}
            <br />
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
            Nickname
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
            Email
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
          {formType === 'answers' ? (
            <input
              className="FAQModalFORM"
              type="button"
              name="Upload Photo"
              value="Upload Photo"
            />
          ) : null}
          <button
            className="FAQModalFORM"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
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
