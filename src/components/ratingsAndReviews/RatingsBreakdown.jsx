import React from 'react';
import propTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import ReviewStarBar from './ReviewStarBar';
import ratings from 'react-ratings-declarative/build/ratings';

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
  const percentPositive = Math.floor(((Number(metadata.recommended.true))
    / numReviews) * 100);
  const modeStarRating = Math.max(
    Object.values(metadata.ratings).map((x) => Number(x)),
  );
  return (
    <div className="RatingsLeftSide">
      <h1 className="AverageRating">{avgRating}</h1>
      <Ratings
        rating={avgRating}
        widgetRatedColors="orange"
        widgetDimensions="30px"
        widgetSpacings="3px"
        className="OverallStarRating"
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
      <div className="PercentReviews">
        {`${percentPositive}% of reviews recommend this product`}
      </div>
      {Object.keys(metadata.ratings).map(
        (numStars) => (
          <ReviewStarBar
            numStars={Number(numStars)}
            modeStarRating={modeStarRating}
            numMatching={Number(metadata.ratings[numStars])}
            key={numStars}
          />
        ),
      )}
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
