/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import propTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import contexts from '../contexts';

const charDesc = {
  Size: {
    1: 'A size too small',
    2: '1/2 a size too small',
    3: 'Perfect',
    4: '1/2 a size too big',
    5: 'A size too big',
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect',
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect',
  },
  Length: {
    1: 'Runs short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly loose',
    5: 'Runs loose',
  },
};

export default function AddReview({ isOpen, updateIsOpen, metadata }) {
  const [rating, updateRating] = React.useState(0);
  const [recommend, updateRecommend] = React.useState('');
  const charRatings = {
    Size: React.useState(0),
    Width: React.useState(0),
    Comfort: React.useState(0),
    Quality: React.useState(0),
    Length: React.useState(0),
    Fit: React.useState(0),
  };
  const [summary, updateSummary] = React.useState('');
  const [body, updateBody] = React.useState('');
  const [email, updateEmail] = React.useState('');
  const [name, updateName] = React.useState('');
  const [photos, updatePhotos] = React.useState('');

  return (
    <contexts.AppContext.Consumer>
      {({ products, currentProduct }) => {
        const handleSubmit = (e) => {
          e.preventDefault();
          const characteristics = {};
          // eslint-disable-next-line no-restricted-syntax
          for (const char of Object.keys(metadata.characteristics)) {
            // eslint-disable-next-line prefer-destructuring
            characteristics[metadata.characteristics[char].id] = charRatings[char][0];
          }
          axios.post('/reviews', {
            product_id: currentProduct,
            rating,
            summary,
            recommend,
            body,
            name,
            photos: photos.split(' '),
            characteristics,
            email,
          })
            .then(() => {
              updateIsOpen(false);
            })
            .catch((error) => {
              updateIsOpen(false);
              throw Error(error);
            });
        };

        return (
          <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={
              () => updateIsOpen(false)
            }
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
          >
            <h3>Write Your Review</h3>
            <h4>{`About the ${products.filter((product) => product.id === currentProduct)[0].name}`}</h4>
            <form onSubmit={handleSubmit} className="AddAReviewForm">
              Overall Rating*
              <br />
              <Ratings
                rating={rating}
                widgetRatedColors="orange"
                widgetDimensions="20px"
                widgetSpacings="1px"
                className="AddReviewStarInput"
                changeRating={updateRating}
              >
                <Ratings.Widget widgetHoverColor="orange" />
                <Ratings.Widget widgetHoverColor="orange" />
                <Ratings.Widget widgetHoverColor="orange" />
                <Ratings.Widget widgetHoverColor="orange" />
                <Ratings.Widget widgetHoverColor="orange" />
              </Ratings>
              <br />
              <br />
              <label className="ReviewInputLabel">
                Do You Recommend This Product?*
                <br />
                <input
                  type="radio"
                  value="Yes"
                  name="recommend"
                  onChange={() => updateRecommend(true)}
                  checked={recommend === true}
                  required
                />
                <label htmlFor="Yes">Yes</label>
                <input
                  type="radio"
                  value="No"
                  name="recommend"
                  checked={recommend === false}
                  onChange={() => updateRecommend(false)}
                />
                <label htmlFor="No">No</label>
              </label>
              <br />
              <br />
              Characteristics*
              {Object.keys(metadata.characteristics).map(
                (char) => (
                  <div className="ReviewCharacteristicRadioInput" key={char}>
                    <label className="ReviewInputLabel">
                      {`${char}`}
                      <br />
                      <input
                        type="radio"
                        name={char}
                        checked={charRatings[char][0] === 1}
                        value={charDesc[char][1]}
                        onChange={() => charRatings[char][1](1)}
                        required
                      />
                      <label htmlFor={charDesc[char][1]}>{charDesc[char][1]}</label>
                      <input
                        type="radio"
                        name={char}
                        checked={charRatings[char][0] === 2}
                        onChange={() => charRatings[char][1](2)}
                        value={charDesc[char][2]}
                      />
                      <label htmlFor={charDesc[char][2]}>{charDesc[char][2]}</label>
                      <input
                        type="radio"
                        name={char}
                        checked={charRatings[char][0] === 3}
                        onChange={() => charRatings[char][1](3)}
                        value={charDesc[char][3]}
                      />
                      <label htmlFor={charDesc[char][3]}>{charDesc[char][3]}</label>
                      <input
                        type="radio"
                        name={char}
                        checked={charRatings[char][0] === 4}
                        onChange={() => charRatings[char][1](4)}
                        value={charDesc[char][4]}
                      />
                      <label htmlFor={charDesc[char][4]}>{charDesc[char][4]}</label>
                      <input
                        type="radio"
                        name={char}
                        checked={charRatings[char][0] === 5}
                        onChange={() => charRatings[char][1](5)}
                        value={charDesc[char][5]}
                      />
                      <label htmlFor={charDesc[char][5]}>{charDesc[char][5]}</label>
                    </label>
                    <br />
                    <br />
                  </div>
                ),
              )}
              <label className="ReviewInputLabel">
                Review Summary
                <br />
                <textarea
                  value={summary}
                  rows="2"
                  cols="33"
                  onChange={(e) => updateSummary(e.target.value)}
                  maxLength={60}
                  placeholder="Example: Best purchase ever!"
                  className="ReviewInput"
                />
              </label>
              <br />
              <br />
              <label className="ReviewInputLabel">
                Review Body*
                <br />
                <textarea
                  value={body}
                  onChange={(e) => updateBody(e.target.value)}
                  maxLength={1000}
                  minLength={50}
                  rows="5"
                  cols="33"
                  placeholder="Why did you like the product or not?"
                  required
                  className="ReviewInput"
                />
                <br />
                {(body.length >= 50) ? 'Minimum reached' : `Minimum required characters left: ${50 - body.length}`}
              </label>
              <br />
              <br />
              <label className="ReviewInputLabel">
                Upload Your Photos
                <br />
                <input
                  type="text"
                  value={photos}
                  onChange={(e) => updatePhotos(e.target.value)}
                  className="ReviewInput"
                />
              </label>
              <br />
              <br />
              <label className="ReviewInputLabel">
                Your Nickname*
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                  maxLength={60}
                  required
                  placeholder="jackson11!"
                  className="ReviewInput"
                />
                <br />
                For privacy reasons, do not use your full name or email address
              </label>
              <br />
              <br />
              <label className="ReviewInputLabel">
                Your email*
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  required
                  placeholder="Example: jackson11@email.com"
                  className="ReviewInput"
                />
                <br />
                For authentication reasons, you will not be emailed
              </label>
              <br />
              <br />
              <input type="submit" value="Submit" />
              <br />
            </form>
          </ReactModal>
        );
      }}
    </contexts.AppContext.Consumer>
  );
}

AddReview.propTypes = {
  isOpen: propTypes.bool.isRequired,
  updateIsOpen: propTypes.func.isRequired,
  metadata: propTypes.exact({
    product_id: propTypes.string,
    ratings: propTypes.object,
    recommended: propTypes.object,
    characteristics: propTypes.object,
  }).isRequired,
};
