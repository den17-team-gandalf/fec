import axios from 'axios';
import React from 'react';
import ReviewsList from './ReviewsList';
import contexts from '../contexts';
import RatingsBreakdown from './RatingsBreakdown';

let flag = true;

export default function RatingsAndReviews() {
  const ratingsHook = React.useState([]);
  const metadataHook = React.useState({});
  const filterHook = React.useState([1, 2, 3, 4, 5]);

  if (flag) {
    flag = false;
    // console.log('querying:');
    axios.get('/reviews/meta/?product_id=44388')
      .then(({ data }) => {
        metadataHook[1](data);
        return axios.get(`/reviews/?product_id=44388&count=${Number(data.recommended.false)
          + Number(data.recommended.true)}&sort=newest`);
      })
      .then(({ data }) => {
        // console.log('results', data);
        ratingsHook[1](data.results);
      })
      .catch(() => {
        throw Error;
      });
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <contexts.RatingsContext.Provider value={ratingsHook}>
      <h2 className="RatingsTitle">Ratings & Reviews</h2>
      <div className="RatingsAndReviewsGrid">
        {metadataHook[0].recommended
          && (<RatingsBreakdown metadata={metadataHook[0]} filterHook={filterHook} />)}
        <ReviewsList
          numReviews={metadataHook[0].recommended
            ? Number(metadataHook[0].recommended.false)
            + Number(metadataHook[0].recommended.true)
            : 0}
          filter={filterHook[0]}
        />
      </div>
    </contexts.RatingsContext.Provider>
  );
}
