import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';
import PDCarouselSlides from './PDCarouselSlides';

export default function PDCarousel() {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  return (
    <div style={{
      display: 'grid', position: 'relative', gridArea: 'carousel', backgroundColor: 'gray', width: 'auto', height: '600px', margin: '15px',
    }}
    >
      <div id="cSlides" style={{ position: 'absolute' }}>
        <PDCarouselSlides />
      </div>
      <img
        src={currentStyle.photos[0].url}
        alt={currentStyle.name}
        style={{
          width: '300px', height: 'auto', alignSelf: 'center', justifySelf: 'center', objectFit: 'cover',
        }}
      />
      <FontAwesomeIcon
        icon={faExpand}
        style={{
          position: 'absolute', top: '20px', right: '20px', padding: '2px', color: 'black',
        }}
      />
    </div>
  );
}

PDCarousel.propTypes = {
  currentStyle: PropTypes.object,
};
