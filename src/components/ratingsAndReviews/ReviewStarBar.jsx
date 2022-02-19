/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';

const updateFilters = (e, filterHook, numStars) => {
  const i = filterHook[0].indexOf(numStars);
  if (i !== -1) {
    filterHook[1](filterHook[0].slice(0, i).concat(
      filterHook[0].slice(i + 1, filterHook[0].length),
    ));
  } else {
    filterHook[1](filterHook[0].concat([numStars]));
  }
};

export default function ReviewStarBar({
  numStars, modeStarRating, numMatching, filterHook,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div id={`StarsBar${numStars}`} onClick={(e) => updateFilters(e, filterHook, numStars)}>
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
  filterHook: propTypes.arrayOf(propTypes.any).isRequired,
};
