import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import contexts from '../contexts';

export default function ReviewSortBar({ sortMethod, updateSort, numReviews }) {
  return (
    <contexts.RatingsContext.Consumer>
      {([reviews, updateReviews]) => (
        <div className="SortBar">
          {`${numReviews} reviews, sorted by `}
          <select
            name="sortMethod"
            onChange={(e) => {
              if (sortMethod !== e.target.value) {
                updateSort(e.target.value);
                axios.get(`/reviews/?product_id=44388&count=${reviews.length}&sort=${e.target.value}`)
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

    </contexts.RatingsContext.Consumer>
  );
}

ReviewSortBar.propTypes = {
  sortMethod: propTypes.string.isRequired,
  updateSort: propTypes.func.isRequired,
  numReviews: propTypes.number.isRequired,
};
