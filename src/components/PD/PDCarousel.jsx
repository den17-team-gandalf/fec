import React from 'react';
import PropTypes from 'prop-types';

export default function PDCarousel({ styles, currentStyle }) {
  return (
    <div style={{ gridArea: 'carousel' }}>
      <img src={currentStyle.photos[0].url} alt={currentStyle.name} style={{ width: '300px', height: 'auto' }} />
    </div>
  );
}

PDCarousel.propTypes = {
  styles: PropTypes.object,
  currentStyle: PropTypes.object,
};
