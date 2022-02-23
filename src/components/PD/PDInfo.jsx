import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
} from 'react-share';

export default function PDInfo({ product }) {
  return (
    <div className="PDInfo">
      {Object.keys(product).length !== 0
      && (
      <div className="description">
        <strong>{product.slogan}</strong>
        <br />
        {product.description}
        <br />
        <a href="https://www.facebook.com">
          <FacebookIcon key="1" className="I_share" />
        </a>
        {' '}
        <a href="https://www.twitter.com">
          <TwitterIcon key="2" className="I_share" />
        </a>
        {' '}
        <a href="https://www.pinterest.com">
          <PinterestIcon key="3" className="I_share" />
        </a>
      </div>
      )}
      <div className="vl" />
      <div className="I_checksD">
        {product.features.map((feature) => (
          <span key={Math.random()}>
            <FontAwesomeIcon icon={faCheck} />
            {' '}
            <strong>{feature.feature}</strong>
            :
            {' '}
            {feature.value}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

PDInfo.propTypes = {
  product: PropTypes.object,
};
