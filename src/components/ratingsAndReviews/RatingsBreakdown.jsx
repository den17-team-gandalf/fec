import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

export default function RatingsBreakdown({ metadata }) {
  const numReviews = parseInt(metadata.recommended.false, 10)
    + parseInt(metadata.recommended.true, 10);
  const avgRating = (Math.floor((
    Number(metadata.ratings['1'])
    + (Number(metadata.ratings['2']) * 2)
    + (Number(metadata.ratings['3']) * 3)
    + (Number(metadata.ratings['4']) * 4)
    + (Number(metadata.ratings['5']) * 5)
  ) / (numReviews / 4)) / 4);

  console.log(metadata);
  return (
    <div className="RatingsLeftSide">
      <h1 className="AverageRating">{avgRating}</h1>
    </div>
  );
}

RatingsBreakdown.propTypes = {
  metadata: propTypes.exact({
    product_id: propTypes.string,
    ratings: propTypes.object,
    recommended: propTypes.object,
    characteristics: propTypes.object,
  }).isRequired,
};
