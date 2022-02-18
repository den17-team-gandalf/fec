import React from 'react';
import propTypes from 'prop-types';
import contexts from '../contexts';
import IndividualReview from './IndividualReview';
import ReviewSortBar from './ReviewSortBar';

export default function ReviewsList({ filter }) {
  const [displayedReviews, updateDisplayedReviews] = React.useState(2);
  return (
    <contexts.RatingsContext.Consumer>
      {([reviews]) => {
        const filteredReviews = reviews.filter((review) => ((filter.length === 0)
          || (filter.includes(review.rating))));
        return (
          <div className="ReviewsRightSide">
            <ReviewSortBar numReviews={filteredReviews.length} />
            <ul className="ReviewsList">
              {filteredReviews.slice(0, displayedReviews).map(
                (review) => <IndividualReview review={review} key={review.review_id} />,
              )}
            </ul>
            {displayedReviews < filteredReviews.length && (
              <button
                type="submit"
                className="LoadReviewsButton"
                onClick={() => {
                  updateDisplayedReviews(displayedReviews + 2);
                }}
              >
                More Reviews
              </button>
            )}
          </div>
        );
      }}
    </contexts.RatingsContext.Consumer>
  );
}

ReviewsList.propTypes = {
  filter: propTypes.arrayOf(propTypes.number).isRequired,
};
