import axios from 'axios';
import React from 'react';
import ReviewsList from './ReviewsList';
import contexts from '../contexts';
import RatingsBreakdown from './RatingsBreakdown';

let flag = true;

export default function RatingsAndReviews() {
  const ratingsHook = React.useState([]);
  const metadataHook = React.useState({});
  if (flag) {
    flag = false;
    // console.log('querying:');
    axios.get('/reviews/meta/?product_id=44388')
      .then(({ data }) => {
        metadataHook[1](data);
      })
      .catch(() => {
        throw Error;
      });
    axios.get('/reviews/?product_id=44388&count=4&sort="newest"')
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
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <contexts.RatingsContext.Provider value={ratingsHook}>
      <section id="scrollTo">
        <h2 className="RatingsTitle">Ratings & Reviews</h2>
      </section>
      <div className="RatingsAndReviewsGrid">
        {metadataHook[0].recommended && (<RatingsBreakdown metadata={metadataHook[0]} />)}
        <ReviewsList numReviews={metadataHook[0].recommended
          ? parseInt(metadataHook[0].recommended.false, 10)
          + parseInt(metadataHook[0].recommended.true, 10)
          : 0}
        />
      </div>
    </contexts.RatingsContext.Provider>
  );
}
