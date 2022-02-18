import axios from 'axios';
import React from 'react';
import propTypes from 'prop-types';
import contexts from '../contexts';
import IndividualReview from './IndividualReview';
import ReviewSortBar from './ReviewSortBar';

let nextPage = 3;

const loadReviews = (reviews, updateReviews, sortMethod) => {
  axios.get(`/reviews/?product_id=44388&count=2&page=${nextPage}&sort="${sortMethod}"`)
    .then(({ data }) => {
      // console.log('results', data);
      updateReviews(reviews.concat(data.results));
      nextPage += 1;
    })
    .catch(() => {
      throw Error;
    });
};

export default function ReviewsList({ numReviews }) {
  const [displayedReviews, updateDisplayedReviews] = React.useState(2);
  const [sortMethod, updateSort] = React.useState('newest');
  return (
    <contexts.RatingsContext.Consumer>
      {([reviews, updateReviews]) => (
        <div className="ReviewsRightSide">
          <ReviewSortBar sortMethod={sortMethod} updateSort={updateSort} numReviews={numReviews} />
          <ul className="ReviewsList">
            {reviews.slice(0, displayedReviews).map(
              (review) => <IndividualReview review={review} key={review.review_id} />,
            )}
          </ul>
          {displayedReviews < reviews.length && (
            <button
              type="submit"
              className="LoadReviewsButton"
              onClick={() => {
                updateDisplayedReviews(reviews.length);
                loadReviews(reviews, updateReviews, sortMethod);
              }}
            >
              More Reviews
            </button>
          )}
        </div>
      )}
    </contexts.RatingsContext.Consumer>
  );
}

ReviewsList.propTypes = {
  numReviews: propTypes.number.isRequired,
};
