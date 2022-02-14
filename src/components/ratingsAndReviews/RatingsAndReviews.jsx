import axios from 'axios';
import React from 'react';
// eslint-disable-next-line import/extensions
import ReviewsList from './ReviewsList.jsx';
// import contexts from '../contexts.js';

let flag = true;

export default function RatingsAndReviews() {
  const [reviews, updateReviews] = React.useState([]);
  if (flag) {
    flag = false;
    // console.log('querying:');
    axios.get('/reviews/?product_id=44391')
      .then(({ data }) => {
        // console.log('results', data);
        updateReviews(data.results);
      })
      .catch(() => {
        throw Error;
      });
  }
  // <contexts.AppContext.Consumer>
  // </contexts.AppContext.Consumer>
  return (
    <div>
      <ReviewsList reviews={reviews} />
    </div>
  );
}
