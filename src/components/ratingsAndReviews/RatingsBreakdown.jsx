import React from 'react';
import propTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import ReviewStarBar from './ReviewStarBar';
import CharacteristicBar from './CharacteristicBar';

export default function RatingsBreakdown({ metadata, filterHook }) {
  const numReviews = parseInt(metadata.recommended.false, 10)
    + parseInt(metadata.recommended.true, 10);
  let avgRating = (Math.floor((
    Number(metadata.ratings['1'])
    + (Number(metadata.ratings['2']) * 2)
    + (Number(metadata.ratings['3']) * 3)
    + (Number(metadata.ratings['4']) * 4)
    + (Number(metadata.ratings['5']) * 5)
  ) / (numReviews / 4)) / 4);
  let roundedRating = (Math.round((
    Number(metadata.ratings['1'])
    + (Number(metadata.ratings['2']) * 2)
    + (Number(metadata.ratings['3']) * 3)
    + (Number(metadata.ratings['4']) * 4)
    + (Number(metadata.ratings['5']) * 5)
  ) / (numReviews / 10)) / 10);
  const percentPositive = Math.floor(((Number(metadata.recommended.true))
    / numReviews) * 100);
  const modeStarRating = Math.max(
    ...Object.values(metadata.ratings).map((x) => Number(x)),
  );
  if (Number.isNaN(avgRating)) {
    avgRating = 0;
  }
  if (Number.isNaN(roundedRating)) {
    roundedRating = 0;
  }
  return (
    <div className="RatingsLeftSide">
      <div className="RatingsLeftSideStars">
        <h1 className="AverageRating">{roundedRating}</h1>
        <div className="OverallStarRating">
          <Ratings
            rating={avgRating || 0}
            widgetRatedColors="orange"
            widgetDimensions="25px"
            widgetSpacings="2px"
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </div>
        <div className="PercentReviews">
          {`${percentPositive || 0}% of ${numReviews || 0} reviews recommend this product`}
        </div>
        {Object.keys(metadata.ratings).map(
          (numStars) => (
            <ReviewStarBar
              numStars={Number(numStars)}
              modeStarRating={modeStarRating.toString()}
              numMatching={metadata.ratings[numStars]}
              filterHook={filterHook}
              key={numStars}
            />
          ),
        )}
      </div>
      <div className="ReviewsFilterDisplay">
        {(filterHook[0].length !== 0) && (
          <div>
            {`Currently Applied Filters: ${JSON.stringify(filterHook[0]).slice(1, -1)}`}
          </div>
        )}
      </div>
      <div className="ProductCharacteristics">
        {Object.keys(metadata.characteristics).map(
          (characteristic) => (
            <CharacteristicBar
              key={metadata.characteristics[characteristic].id}
              characteristic={characteristic}
              rating={Number(metadata.characteristics[characteristic].value)}
            />
          ),
        )}
      </div>
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
  filterHook: propTypes.arrayOf(propTypes.any).isRequired,
};
