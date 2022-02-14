import React from 'react';
import PropTypes from 'prop-types';

export default function PDInfo({ product }) {
  return (
    <div style={{ gridArea: 'details' }}>
      {Object.keys(product).length !== 0
      && (
      <div id="description">
        <strong>{product.slogan}</strong>
        <br />
        {product.description}
      </div>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

PDInfo.propTypes = {
  product: PropTypes.object,
};
