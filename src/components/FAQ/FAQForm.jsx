/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FAQForm({ data }) {
  const { formType, productId } = data;
  // console.log(formType);
  const [userInput, setUserInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [productData, setData] = useState('');
  // console.log(userInput.length, nameInput, emailInput);
  useEffect(async () => {
    let result = await axios.get(`/products/?product_id=${productId}`);
    result = result.data;
    for (let i = 0; i < result.length; i++) {
      console.log(result[i], ' id');
      if (result[i].id === productId) {
        await setData(result[i].name);
        return;
      }
    }
  }, []);
  console.log(productData, ' id2');
  function handleClick(type, id) {
    const data = {
      body: userInput,
      name: nameInput,
      email: emailInput,
      product_id: id,
    };
    // axios.post('/qa/questions', data);
  }
  console.log('stuff ', productData);
  useEffect(() => {
    // if (userInput.length > 1000 && nameInput.length > 60) {
    //   setErrors(`Response needs ${1000 - userInput.length} more characters!`);
    // } else {
    //   setErrors('');
    // }
  }, [userInput, nameInput]);
  // if question get question to stick on top of answers
  // productData.find((q) => console.log(q));
  return (
    <form>
      <label>
        {formType === 'answers' ? (
          <>
            Submit Your Answer:
            <br />
            {/* <sub>{`${productData.name}: ${data.questionBody}`}</sub> */}
          </>
        ) : (
          <>
            {' '}
            Ask Your Question:
            <br />
            {productData.length > 1 ? (
              <sub>{`About the ${productData}`}</sub>
            ) : (
              <sub>About the ...loading</sub>
            )}
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
      {formType === 'ans' ? (
        <input type="button" name="Upload Photo" value="Upload Photo" />
      ) : null}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleClick(formType, productId);
        }}
        type="button"
      >
        Submit
      </button>
    </form>
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
