import axios from 'axios';
import React from 'react';
import contexts from '../contexts';
import IndividualReview from './IndividualReview';

let nextPage = 3;

const loadReviews = (reviews, updateReviews) => {
  axios.get(`/reviews/?product_id=44391&count=2&page=${nextPage}`)
    .then(({ data }) => {
      // console.log('results', data);
      updateReviews(reviews.concat(data.results));
      nextPage += 1;
    })
    .catch(() => {
      throw Error;
    });
};

export default function ReviewsList() {
  const [displayedReviews, updateDisplayedReviews] = React.useState(2);
  return (
    <contexts.RatingsContext.Consumer>
      {([reviews, updateReviews]) => (
        <div>
          <ul className="ReviewsList">
            {reviews.slice(0, displayedReviews).map(
              (review) => <IndividualReview review={review} key={review.review_id} />
            )}
            {displayedReviews < reviews.length && (
              <button
                type="submit"
                className="LoadReviewsButton"
                onClick={() => {
                  updateDisplayedReviews(reviews.length);
                  loadReviews(reviews, updateReviews);
                }}
              >
                More Reviews
              </button>
            )}
          </ul>
        </div>
      )}
    </contexts.RatingsContext.Consumer>
  );
}
