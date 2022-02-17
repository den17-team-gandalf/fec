import React from 'react';
import propTypes from 'prop-types';

export default function ReviewStarBar({ numStars, modeStarRating, numMatching }) {
  return (
    <div id={`StarsBar${numStars}`}>
      {`${numStars} stars`}
      <progress id="file" max="100" value="70" />
    </div>
  );
}

ReviewStarBar.propTypes = {
  numStars: propTypes.number.isRequired,
  modeStarRating: propTypes.number.isRequired,
  numMatching: propTypes.number.isRequired,
};
