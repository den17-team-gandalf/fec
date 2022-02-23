/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import propTypes from 'prop-types';
import React from 'react';
import Ratings from 'react-ratings-declarative';
import ReactModal from 'react-modal';

const markHelpful = (e, id, updateHelpfulness, unUsed) => {
  if (unUsed.flag) {
    axios.put(`/reviews/${id}/helpful`)
      .then(() => {
        updateHelpfulness((x) => x + 1);
        // eslint-disable-next-line no-param-reassign
        unUsed.flag = false;
      })
      .catch((err) => {
        throw err;
      });
  }
};

const reportReview = (e, id, unUsed) => {
  if (unUsed.flag) {
    axios.put(`/reviews/${id}/report`)
      .then(() => {
        // eslint-disable-next-line no-param-reassign
        unUsed.flag = false;
      })
      .catch((err) => {
        throw err;
      });
  }
};

const formatDateString = (date) => {
  let str = new Date(date).toDateString();
  str = `${str.slice(4, str.length - 5)},${str.slice(str.length - 5, str.length)}`;
  return str;
};

export default function IndividualReview({ review }) {
  const [helpfulness, updateHelpfulness] = React.useState(review.helpfulness);
  const [unUsed] = React.useState({ flag: true });
  const [bodyChars, updateBodyChars] = React.useState(250);
  const [currentPicture, updateCurrentPicture] = React.useState(null);
  return (
    <li className="IndividualReview">
      <div className="IndividualReviewTitleBar">
        <Ratings
          rating={review.rating || 0}
          widgetRatedColors="green"
          widgetDimensions="20px"
          widgetSpacings="1px"
          className="ReviewStarRating"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
        <div className="ReviewUsernameAndDate">
          {review.reviewer_name}
          {`, ${formatDateString(review.date)}`}
        </div>
      </div>
      <h3 className="ReviewBody">
        {review.summary}
      </h3>
      <p className="ReviewBody">
        {review.body.length < bodyChars && review.body}
        {review.body.length > bodyChars && `${review.body.slice(0, bodyChars)}...`}
        {review.body.length > bodyChars && (<br />)}
        {review.body.length > bodyChars && (
          <button type="submit" className="LoadMoreBodyButton" onClick={() => updateBodyChars(1000)}>
            Load More
          </button>
        )}
      </p>
      {review.photos.map(({ url, id }) => (
        <img
          src={url}
          alt="user-submitted"
          width="100"
          key={id}
          loading="lazy"
          onClick={(e) => updateCurrentPicture(e.target.src)}
        />
      ))}
      {currentPicture && (
        <ReactModal
          isOpen
          ariaHideApp={false}
          onRequestClose={
            () => updateCurrentPicture(null)
          }
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
        >
          <div className="ReviewPictureModal">
            <img
              src={currentPicture}
              alt="user-submitted"
            />
          </div>
        </ReactModal>
      )}
      {review.recommend && (<div className="ReviewRecommendation">✓ I recommend this product</div>)}
      {review.response !== null && (
        <div className="ResponseBox">
          <h4 className="ResponseHeader">
            Response:
          </h4>
          <p className="ResponseBody">
            {review.response}
          </p>
        </div>
      )}
      <div className="RatingHelpful">
        Helpful?
        <button
          className="RatingHelpfulButton"
          type="button"
          onClick={
            (e) => markHelpful(e, review.review_id, updateHelpfulness, unUsed)
          }
        >
          Yes
        </button>
        {`(${helpfulness})   |   `}
        <button
          className="RatingReportButton"
          type="button"
          onClick={
            (e) => reportReview(e, review.review_id, unUsed)
          }
        >
          Report
        </button>
      </div>
      <hr />
    </li>
  );
}

IndividualReview.propTypes = {
  review: propTypes.exact({
    review_id: propTypes.number,
    rating: propTypes.number,
    summary: propTypes.string,
    recommend: propTypes.bool,
    response: propTypes.any,
    body: propTypes.string,
    date: propTypes.string,
    reviewer_name: propTypes.string,
    helpfulness: propTypes.number,
    photos: propTypes.array,
  }),
};

IndividualReview.defaultProps = {
  review: {
    review_id: 0,
    rating: 0,
    summary: '',
    recommend: false,
    response: null,
    body: '',
    date: '2022-01-03T00:00:00.000Z',
    reviewer_name: '',
    helpfulness: 0,
    photos: [],
  },
};
