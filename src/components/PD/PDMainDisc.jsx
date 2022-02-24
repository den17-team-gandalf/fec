import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import contexts from '../contexts';

let loaded = 0;

export default function PDMainDisc({ product, expanded }) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [avgStars, setAvgStars] = React.useState(0);
  const [totalStars, setTotalStars] = React.useState(0);
  const [showStars, setShowStars] = React.useState(true);

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

  React.useEffect(() => {
    if (expanded) {
      setShowStars(false);
    } else {
      setShowStars(true);
    }
  }, [expanded, totalStars, showStars]);

  // if (Object.keys(avgStars).length === 0) {
  //   axios.get('/reviews/meta/?product_id=44388')
  //     .then(({ data }) => {
  //       setAvgStars(avg(data.ratings));
  //       setTotalStars(totalRevs(data.ratings));
  //     })
  //     .catch(() => { });
  // }

  return (
    <contexts.AppContext.Consumer>
      {({ currentProduct }) => {
        if (loaded !== currentProduct) {
          loaded = currentProduct;
          axios.get(`/reviews/meta/?product_id=${currentProduct}`)
            .then(({ data }) => {
              if (typeof data.ratings === 'number' && Number(data.ratings).isNaN) {
                setAvgStars(avg(data.ratings));
                setTotalStars(totalRevs(data.ratings));
              }
            })
            .catch(() => { });
        }
        return (
          <div className="PDMainDisc">
            <br />
            {showStars
      && (
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
      )}
            {' '}
            {showStars && (
            <a href="#Reviews" target="_self">
              {' '}
              Read all
              {' '}
              {totalStars}
              {' '}
              reviews

            </a>
            )}
            <br />
            <br />
            {product.category
      && product.category.toUpperCase()}
            <br />
            {product.name && (<div className="productName"><strong>{product.name}</strong></div>)}
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
      }}
    </contexts.AppContext.Consumer>
  );
}

PDMainDisc.propTypes = {
  product: PropTypes.object,
  expanded: PropTypes.bool.isRequired,
};
