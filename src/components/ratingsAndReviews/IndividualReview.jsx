import axios from 'axios';
import propTypes from 'prop-types';
import React from 'react';

// let unUsed = true;

const markHelpful = (e, id, updateHelpfulness, unUsed) => {
  // console.log(id, unUsed);
  if (unUsed.flag) {
    axios.put(`/reviews/${id}/helpful`)
      .then(() => {
        updateHelpfulness((x) => x + 1);
        // eslint-disable-next-line no-param-reassign
        unUsed.flag = false;
        // e.target.childNodes[0].nodeValue = Number(e.target.text)
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
        // console.log(results);
        // eslint-disable-next-line no-param-reassign
        unUsed.flag = false;
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default function IndividualReview({ review }) {
  const [helpfulness, updateHelpfulness] = React.useState(review.helpfulness);
  const [unUsed] = React.useState({ flag: true });
  return (
    <li className="IndividualReview">
      {`Star Rating : ${review.rating}, `}
      {review.reviewer_name}
      {`, Time ${review.date} (Modules to make together with others)`}
      <h3 className="ReviewBody">
        {review.summary}
      </h3>
      <p className="ReviewBody">
        {review.body}
      </p>
      {review.photos.map(({ url, id }) => (<img src={url} alt="user-submitted" width="100" key={id} />))}
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
        {`(${helpfulness})  |  `}
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
