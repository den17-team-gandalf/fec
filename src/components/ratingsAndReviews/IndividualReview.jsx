import propTypes from 'prop-types';
import React from 'react';

export default function IndividualReview({ review }) {
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
      {review.recommend && (<div className="ReviewRecommendation">✓ I recommend this product</div>)}
      {review.response && (
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
        <button className="RatingHelpfulButton" type="button" onClick={() => console.log('Mark Helpful Clicked!')}>Yes</button>
        {`(${review.helpfulness})  |  `}
        <button className="RatingReportButton" type="button" onClick={() => console.log('Report Clicked!')}>Report</button>
      </div>
    </li>
  );
}

IndividualReview.propTypes = {
  review: propTypes.exact({
    review_id: propTypes.number,
    rating: propTypes.number,
    summary: propTypes.string,
    recommend: propTypes.bool,
    response: propTypes.object,
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
