import React from 'react';
import propTypes from 'prop-types';
import contexts from '../contexts';
import IndividualReview from './IndividualReview';
import ReviewSortBar from './ReviewSortBar';
import AddReview from './AddReview';

export default function ReviewsList({ filter, metadata }) {
  const [displayedReviews, updateDisplayedReviews] = React.useState(2);
  const [addReviewOpen, updateAddReview] = React.useState(false);
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
            <div className="ReviewsListButtons">
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
              <button
                type="submit"
                className="AddReviewButton"
                onClick={() => updateAddReview(!addReviewOpen)}
              >
                Add A Review +
              </button>
            </div>
            <AddReview
              isOpen={addReviewOpen}
              updateIsOpen={updateAddReview}
              metadata={metadata}
            />
          </div>
        );
      }}
    </contexts.RatingsContext.Consumer>
  );
}

ReviewsList.propTypes = {
  filter: propTypes.arrayOf(propTypes.number).isRequired,
  metadata: propTypes.exact({
    product_id: propTypes.string,
    ratings: propTypes.object,
    recommended: propTypes.object,
    characteristics: propTypes.object,
  }).isRequired,
};
