import React from 'react';
import PropTypes from 'prop-types';
// import contexts from '../contexts';
// eslint-disable-next-line import/extensions
import IndividualReview from './IndividualReview.jsx';

export default function ReviewsList({ reviews }) {
  // <contexts.AppContext.Consumer>
  // </contexts.AppContext.Consumer>
  return (
    <div>
      <ul>
        {reviews.map((review) => <IndividualReview review={review} key={review.review_id} />)}
      </ul>
    </div>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};

ReviewsList.defaultProps = {
  reviews: [],
};
