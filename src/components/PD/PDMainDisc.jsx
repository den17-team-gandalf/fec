import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function PDMainDisc({ product }) {
  return (
    <div id="mainDisc">
      ***** Read All Reviews<br />
      {product.category}<br />
      <strong>{product.name}</strong><br />
      ${product.default_price}
    </div>
  )
}
