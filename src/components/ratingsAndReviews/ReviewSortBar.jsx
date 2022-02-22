import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import contexts from '../contexts';

export default function ReviewSortBar({ numReviews }) {
  const [sortMethod, updateSort] = React.useState('newest');
  return (
    <contexts.RatingsContext.Consumer>
      {([reviews, updateReviews]) => (
        <contexts.AppContext.Consumer>
          {({ currentProduct }) => (
            <div className="ReviewSortBar">
              {`${numReviews} reviews, sorted by `}
              <select
                name="sortMethod"
                onChange={(e) => {
                  if (sortMethod !== e.target.value) {
                    updateSort(e.target.value);
                    axios.get(`/reviews/?product_id=${currentProduct}&count=${reviews.length}&sort=${e.target.value}`)
                      .then(({ data }) => {
                        updateReviews(data.results);
                      })
                      .catch(() => {
                        throw Error;
                      });
                  }
                }}
              >
                <option value="newest">Newest</option>
                <option value="relevant">Relevant</option>
                <option value="helpful">Helpful</option>
              </select>
            </div>
          )}
        </contexts.AppContext.Consumer>
      )}
    </contexts.RatingsContext.Consumer>
  );
}

ReviewSortBar.propTypes = {
  numReviews: propTypes.number.isRequired,
};
