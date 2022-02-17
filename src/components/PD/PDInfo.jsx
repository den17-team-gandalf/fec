import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PDInfo({ product }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateAreas: `
      'disc line checks'
      'share line checks'
    `,
      gridArea: 'details',
      margin: '15px',
    }}
    >
      {Object.keys(product).length !== 0
      && (
      <div id="description" style={{ gridArea: 'disc' }}>
        <strong>{product.slogan}</strong>
        <br />
        {product.description}
      </div>
      )}
      <br />
      <br />
      <div
        id="vl"
        style={{
          borderLeft: '2px solid gray', height: '100%', gridArea: 'line', margin: '10px',
        }}
      />
      <div className="addthis_inline_share_toolbox" style={{ gridArea: 'share', margin: '10px' }} />
      <div
        id="checks"
        style={{
          position: 'relative', gridArea: 'checks', margin: '10px',
        }}
      >
        <FontAwesomeIcon
          icon={faCheck}
        />
        {' '}
        Silk sourced from Genghis Khan's tomb
        <br />
        <FontAwesomeIcon
          icon={faCheck}
        />
        {' '}
        Cruelty Free*
        <br />
        <FontAwesomeIcon
          icon={faCheck}
        />
        {' '}
        Scent of lavender and sewage
        <br />
        <FontAwesomeIcon
          icon={faCheck}
        />
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
