import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';
import PDCarouselSlide from './PDCarouselSlide';

export default function PDCarouselSlides({
  currentPhoto, setCurrentPhoto,
  currentPhotoIndex, setCurrentPhotoIndex, expanded,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [thumbIndex, setThumbIndex] = React.useState(0);
  const otherThumbnails = () => {
    if (thumbIndex === 0) {
      setThumbIndex(1);
    } else {
      setThumbIndex(0);
    }
  };

  React.useEffect(() => {
    setThumbIndex(0);
  }, [currentStyle]);

  React.useEffect(() => {
    if (currentPhotoIndex >= 7) {
      setThumbIndex(1);
    } else {
      setThumbIndex(0);
    }
  }, [currentPhotoIndex]);
  return (
    <div className="PDSlides">

      {currentStyle.photos.length <= 7 && thumbIndex !== 1
        && (currentStyle.photos.map((photo) => (
          <PDCarouselSlide
            key={Math.random()}
            currentPhotoIndex={currentPhotoIndex}
            setCurrentPhotoIndex={setCurrentPhotoIndex}
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
            thisPhoto={photo}
            expanded={expanded}
          />
        )))}

      {currentStyle.photos.length > 7 && thumbIndex !== 1
        && (currentStyle.photos.slice(0, 7).map((photo) => (
          <PDCarouselSlide
            key={Math.random()}
            currentPhotoIndex={currentPhotoIndex}
            setCurrentPhotoIndex={setCurrentPhotoIndex}
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
            thisPhoto={photo}
            expanded={expanded}
          />
        )))}

      {currentStyle.photos.length > 7 && thumbIndex === 0
      && (
      <FontAwesomeIcon
        className="I_down"
        icon={faArrowDown}
        onClick={() => otherThumbnails()}
      />
      )}

      {currentStyle.photos.length > 7 && thumbIndex === 1
      && (
        <>
          {currentStyle.photos.slice(7, currentStyle.photos.length).map((photo) => (

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
          <FontAwesomeIcon
            className="I_down"
            icon={faArrowUp}
            onClick={() => otherThumbnails()}
          />
        </>
      )}
    </div>
  );
}

PDCarouselSlides.propTypes = {
  currentPhoto: PropTypes.string,
  setCurrentPhoto: PropTypes.func.isRequired,
  currentPhotoIndex: PropTypes.number.isRequired,
  setCurrentPhotoIndex: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};
