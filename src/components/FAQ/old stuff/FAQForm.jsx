/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

export default function FAQForm(formType = 'ans', itemId = 0) {
  let route;


  const [userInput, setUserInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  // const [pictureInput, setUserInput] = useState("");
  console.log(userInput.length, nameInput, emailInput);

  useEffect(() => {
    if (userInput.length > 1000) {
    }
  }, [nameInput]);
  useEffect(() => {
    if (nameInput.length > 60) {
    }
  }, [nameInput]);
  // if question get question to stick ontop of answers
  return (
    <form>
      <label>
        {formType === 'ans' ? <>Answer:</> : <>Question:</>}
        <br />
        <input
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
      <input type="button" name="Submit" value="Submit" />
    </form>
  );
}

/*
answer model
answer -1000 char
nickname- 60 char
email- 60char
1.3.6.4.   Upload your photos
A button will appear allowing users to upload their photos to the form.  Up to five photos should be allowed for each answer.
Clicking the button should open a separate window where the photo to be can be selected.
After the first image is uploaded, a thumbnail showing the image should appear.  A user should be able to add up to five images before the button to add disappears, preventing further additions.
1.3.6.5.     Submit answer (button)
A button by which the answer can be submitted.
Upon selecting this button the form’s inputs should be validated.   If there are any invalid entries, the submission should be prevented, and a warning message will appear.   This message should be titled “You must enter the following:”
This error will occur if:
Any mandatory fields are blank
The email address provided is not in correct email format
The images selected are invalid or unable to be uploaded.

question model
question email nickname
*/
