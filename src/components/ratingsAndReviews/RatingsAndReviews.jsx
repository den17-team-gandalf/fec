import axios from 'axios';
import React from 'react';
import ReviewsList from './ReviewsList';
import contexts from '../contexts';
import RatingsBreakdown from './RatingsBreakdown';

// let flag = false;
let loadedReviews = 0;

export default function RatingsAndReviews() {
  const ratingsHook = React.useState([]);
  const metadataHook = React.useState({});
  const filterHook = React.useState([]);
  return (
    <contexts.AppContext.Consumer>
      {({ currentProduct }) => {
        if (loadedReviews !== currentProduct) {
          loadedReviews = currentProduct;
          // flag = false;
          // console.log('querying:');
          axios.get(`/reviews/meta/?product_id=${currentProduct}`)
            .then(({ data }) => {
              metadataHook[1](data);
              return axios.get(`/reviews/?product_id=${currentProduct}&count=${Number(data.recommended.false)
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
          <contexts.RatingsContext.Provider value={ratingsHook}>
            <span id="Reviews" />
            <h2 className="RatingsTitle">Ratings & Reviews</h2>
            <div className="RatingsAndReviewsGrid">
              {metadataHook[0].recommended
                && (<RatingsBreakdown metadata={metadataHook[0]} filterHook={filterHook} />)}
              {metadataHook[0].recommended
                && (
                  <ReviewsList
                    numReviews={metadataHook[0].recommended
                      ? Number(metadataHook[0].recommended.false)
                      + Number(metadataHook[0].recommended.true)
                      : 0}
                    filter={filterHook[0]}
                    metadata={metadataHook[0]}
                  />
                )}
            </div>
          </contexts.RatingsContext.Provider>
        );
      }}
    </contexts.AppContext.Consumer>
  );
}
