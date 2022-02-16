import React from 'react';
// import PropTypes from 'prop-types';
import contexts from '../contexts';
import IndividualReview from './IndividualReview';

export default function ReviewsList() {
  // <contexts.AppContext.Consumer>
  // </contexts.AppContext.Consumer>
  // console.log(reviews);
  return (
    <contexts.RatingsContext.Consumer>
      {([reviews]) => (
        <div>
          <ul className="ReviewsList">
            {reviews.map((review) => <IndividualReview review={review} key={review.review_id} />)}
          </ul>
        </div>
      )}
    </contexts.RatingsContext.Consumer>
  );
}

// ReviewsList.propTypes = {
//   reviews: PropTypes.arrayOf(PropTypes.object),
// };

// ReviewsList.defaultProps = {
//   reviews: [],
// };
