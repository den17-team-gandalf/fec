import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PDInfo({ product }) {
  return (
    <div className="PDInfo">
      {Object.keys(product).length !== 0
      && (
      <div className="description">
        <strong>{product.slogan}</strong>
        <br />
        {product.description}
      </div>
      )}
      <br />
      <br />
      <div className="addthis_inline_share_toolbox" />
      <div className="vl" />
      <div className="I_checksD">
        <FontAwesomeIcon icon={faCheck} />
        {' '}
        Silk sourced from Genghis Khan's tomb
        <br />
        <FontAwesomeIcon icon={faCheck} />
        {' '}
        Cruelty Free*
        <br />
        <FontAwesomeIcon icon={faCheck} />
        {' '}
        Scent of lavender and sewage
        <br />
        <FontAwesomeIcon icon={faCheck} />
        {' '}
        100% Edible
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

PDInfo.propTypes = {
  product: PropTypes.object,
};
