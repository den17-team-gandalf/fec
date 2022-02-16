import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function PDMainDisc({ product }) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  return (
    <div id="mainDisc">
      ***** Read All Reviews
      <br />
      {product.category}
      <br />
      <strong>{product.name}</strong>
      <br />
      {currentStyle.sale_price === null ? `$${currentStyle.original_price}`
        : (
          <div>
            <span style={{ color: 'red' }}>
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
