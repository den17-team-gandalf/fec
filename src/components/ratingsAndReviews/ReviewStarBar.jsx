/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';

export default function ReviewStarBar({ numStars, modeStarRating, numMatching }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div id={`StarsBar${numStars}`} onClick={() => console.log('Clicked')}>
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
