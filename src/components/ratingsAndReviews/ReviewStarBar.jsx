import React from 'react';
import propTypes from 'prop-types';

export default function ReviewStarBar({ numStars, modeStarRating, numMatching }) {
  return (
    <div id={`StarsBar${numStars}`}>
      {`${numStars} stars`}
      <progress className="ReviewsRatingBar" max={modeStarRating} value={numMatching} />
      {numMatching}
    </div>
  );
}

ReviewStarBar.propTypes = {
  numStars: propTypes.number.isRequired,
  modeStarRating: propTypes.string.isRequired,
  numMatching: propTypes.string.isRequired,
};
