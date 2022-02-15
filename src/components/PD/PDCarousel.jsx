import React from 'react';
import PropTypes from 'prop-types';

export default function PDCarousel({ styles, currentStyle }) {
  return (
    <div style={{ display: 'grid', gridArea: 'carousel', backgroundColor: 'gray', justifyItems: 'center', alignItems: 'center', width: 'auto', height: '500px', margin: '15px'}}>
      <img src={currentStyle.photos[0].url} alt={currentStyle.name} style={{ width: '300px', height: 'auto', justifySelf:'center', objectFit: 'cover'}} />
    </div>
  );
}

PDCarousel.propTypes = {
  styles: PropTypes.object,
  currentStyle: PropTypes.object,
};
