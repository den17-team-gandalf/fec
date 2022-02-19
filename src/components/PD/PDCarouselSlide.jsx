import React from 'react';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function PDCarouselSlide({
  thisPhoto, currentPhoto, setCurrentPhoto,
}) {
  const clicky = () => {
    setCurrentPhoto(thisPhoto.url);
  };
  return (
    <div className="imgCardContainer">
      <input
        className="imgCard"
        type="image"
        onClick={(e) => {
          clicky(e);
        }}
        src={thisPhoto.thumbnail_url}
        alt="Carousel Style Image"
        value={thisPhoto}
      />
      {currentPhoto === thisPhoto.url
      && <hr className="imgToggleLine" />}
    </div>
  );
}

PDCarouselSlide.propTypes = {
  thisPhoto: PropTypes.object,
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
};
