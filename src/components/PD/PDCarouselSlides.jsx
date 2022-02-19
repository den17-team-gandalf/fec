import React from 'react';
import PropTypes from 'prop-types';
import contexts from '../contexts';
import PDCarouselSlide from './PDCarouselSlide';

export default function PDCarouselSlides({
  currentPhoto, setCurrentPhoto,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  return (
    <div className="PDSlides">
      {currentStyle.photos.map((photo) => (
        <PDCarouselSlide
          key={Math.random()}
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
          thisPhoto={photo}
        />
      ))}
    </div>
  );
}

PDCarouselSlides.propTypes = {
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
};
