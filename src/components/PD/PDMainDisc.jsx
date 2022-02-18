import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import contexts from '../contexts';

export default function PDMainDisc({ product }) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [avgStars, setAvgStars] = React.useState(0);
  const [totalStars, setTotalStars] = React.useState(0);
  const totalRevs = (ratings) => (
    Number(ratings['1'])
    + Number(ratings['2'])
    + Number(ratings['3'])
    + Number(ratings['4'])
    + Number(ratings['5'])
  );
  const avg = (ratings) => (
    1 * Number(ratings['1'])
    + 2 * Number(ratings['2'])
    + 3 * Number(ratings['3'])
    + 4 * Number(ratings['4'])
    + 5 * Number(ratings['5'])
  )
    / (totalRevs(ratings));
  if (Object.keys(avgStars).length === 0) {
    axios.get('/reviews/meta/?product_id=44388')
      .then(({ data }) => {
        setAvgStars(avg(data.ratings));
        setTotalStars(totalRevs(data.ratings));
      })
      .catch(() => { });
  }
  return (
    <div className="PDMainDisc">
      <br />
      <Ratings
        rating={avgStars}
        widgetRatedColors="green"
        widgetDimensions="20px"
        widgetSpacings="1px"
        className="ReviewStarRating"
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
      {' '}
      <a href="#scrollTo" target="_self">
        {' '}
        Read all
        {' '}
        {totalStars}
        {' '}
        reviews

      </a>
      <br />
      <br />
      {product.category
      && product.category.toUpperCase()}
      <br />
      <div className="productName"><strong>{product.name}</strong></div>
      <br />
      {currentStyle.sale_price === null ? `$${currentStyle.original_price}`
        : (
          <div>
            <span className="salePrice">
              $
              {currentStyle.sale_price}
            </span>
            &nbsp;
            <s>
              $
              {currentStyle.original_price}
            </s>
          </div>
        )}
    </div>
  );
}

PDMainDisc.propTypes = {
  product: PropTypes.object,
};
