import React from 'react';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function PDCarouselSlide({
  thisPhoto, currentPhoto, setCurrentPhoto,
  currentPhotoIndex, setCurrentPhotoIndex, expanded,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const cardRef = React.useRef('');
  const clicky = () => {
    setCurrentPhoto(thisPhoto.url);
    for (let i = 0; i < currentStyle.photos.length; i++) {
      if (currentStyle.photos[i].url === thisPhoto.url) {
        setCurrentPhotoIndex(i);
      }
    }
  };
  return (
    <div className="imgCardContainer">
      {!expanded ? (
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
      )
        : (
          <input
            ref={cardRef}
            className="imgCardExpanded"
            type="image"
            onClick={(e) => {
              clicky(e);
            }}
            src={thisPhoto.thumbnail_url}
            alt="Carousel Style Image"
            value={thisPhoto}
          />
        )}
      {currentStyle.photos[currentPhotoIndex].url === thisPhoto.url
      && <hr className="imgToggleLine" />}
    </div>
  );
}

PDCarouselSlide.propTypes = {
  thisPhoto: PropTypes.object,
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
  currentPhotoIndex: PropTypes.number.isRequired,
  setCurrentPhotoIndex: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};
