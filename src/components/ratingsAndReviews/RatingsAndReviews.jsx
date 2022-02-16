import axios from 'axios';
import React from 'react';
// eslint-disable-next-line import/extensions
import ReviewsList from './ReviewsList.jsx';
import contexts from '../contexts';

let flag = true;

export default function RatingsAndReviews() {
  const ratingsHook = React.useState([]);
  if (flag) {
    flag = false;
    // console.log('querying:');
    axios.get('/reviews/?product_id=44391&count=4')
      .then(({ data }) => {
        // console.log('results', data);
        ratingsHook[1](data.results);
      })
      .catch(() => {
        throw Error;
      });
  }
  // <contexts.AppContext.Consumer>
  // </contexts.AppContext.Consumer>
  return (
    <contexts.RatingsContext.Provider value={ratingsHook}>
      <ReviewsList reviews={ratingsHook[0]} />
    </contexts.RatingsContext.Provider>
  );
}
