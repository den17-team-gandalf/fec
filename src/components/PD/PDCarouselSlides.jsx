import React from 'react';
import PropTypes from 'prop-types';
import contexts from '../contexts';
import PDCarouselSlide from './PDCarouselSlide';

export default function PDCarouselSlides({
  currentPhoto, setCurrentPhoto,
  currentPhotoIndex, setCurrentPhotoIndex, expanded,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  return (
    <div className="PDSlides">
      {currentStyle.photos.map((photo) => (
        <PDCarouselSlide
          key={Math.random()}
          currentPhotoIndex={currentPhotoIndex}
          setCurrentPhotoIndex={setCurrentPhotoIndex}
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
          thisPhoto={photo}
          expanded={expanded}
        />
      ))}
    </div>
  );
}

PDCarouselSlides.propTypes = {
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
  currentPhotoIndex: PropTypes.number.isRequired,
  setCurrentPhotoIndex: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};
