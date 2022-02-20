import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';
import PDCarouselSlides from './PDCarouselSlides';

export default function PDCarousel({
  areaChanger,
  expanded, setExpanded,
  currentPhoto, setCurrentPhoto,
  currentPhotoIndex, setCurrentPhotoIndex,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const carousel = React.createRef(0);
  const pImage = React.createRef(0);
  const photoIndexerR = (e) => {
    setCurrentPhotoIndex(currentPhotoIndex + 1);
    setCurrentPhoto(currentStyle.photos[currentPhotoIndex + 1].url);
  };
  const photoIndexerL = (e) => {
    setCurrentPhotoIndex(currentPhotoIndex - 1);
    setCurrentPhoto(currentStyle.photos[currentPhotoIndex - 1].url);
  };
  const clicky = (e) => {
    // If clicking on container, image, or expand icon...
    if (e.target.className === 'primaryImg'
    || e.target.className === 'PDCarousel'
    || (Object.values(e.target)[1].className
    && Object.values(e.target)[1].className.includes('expand'))) {
      // If in expanded view and clicking expand icon...
      if (expanded
      && (Object.values(e.target)[1].className
      && Object.values(e.target)[1].className.includes('expand'))) {
        setExpanded(!expanded);
        areaChanger.current.style.gridTemplateAreas = `
          "carousel carousel main"
          "carousel carousel styles"
          "carousel carousel shop"
          "details details details"
        `;
        pImage.current.style = '';
        // If in expanded view and clicking on container or image...
      } else if (expanded
        && (e.target.className === 'primaryImg'
        || e.target.className === 'PDCarousel')) {
        // If not zoomed in yet...
        if (pImage.current.style.cursor === '') {
          pImage.current.style.width = '750px';
          pImage.current.style.cursor = 'zoom-out';
          carousel.current.style.cursor = 'zoom-out';
        // If already zoomed in...
        } else {
          pImage.current.style.width = '450px';
          pImage.current.style.cursor = '';
          carousel.current.style.cursor = '';
        }
        // If in default view...
      } else if (!expanded) {
        setExpanded(!expanded);
        areaChanger.current.style.gridTemplateAreas = `
          "carousel carousel carousel"
          "carousel carousel carousel"
          "carousel carousel carousel"
          "details details details"
        `;
        pImage.current.style.width = '450px';
      }
    }
  };
  return (
    <div
      className="PDCarousel"
      ref={carousel}
      onClick={(e) => clicky(e)}
    >
      <div className="cSlides">
        <PDCarouselSlides
          currentPhotoIndex={currentPhotoIndex}
          setCurrentPhotoIndex={setCurrentPhotoIndex}
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
          expanded={expanded}
        />
        {currentPhotoIndex !== 0
        && (
        <FontAwesomeIcon
          className="I_left"
          icon={faArrowLeft}
          onClick={(e) => photoIndexerL(e)}
        />
        )}
      </div>
      {currentPhoto === '' ? (
        <img
          ref={pImage}
          src={currentStyle.photos[0].url}
          className="primaryImg"
          alt={currentStyle.name}
        />
      )
        : (
          <img
            ref={pImage}
            src={currentStyle.photos[currentPhotoIndex].url}
            className="primaryImg"
            alt={currentStyle.name}
          />
        )}
      <FontAwesomeIcon className="I_expand" icon={faExpand} />
      {currentStyle.photos.length - 1 !== currentPhotoIndex
      && (
        <FontAwesomeIcon
          className="I_right"
          icon={faArrowRight}
          onClick={(e) => photoIndexerR(e)}
        />
      )}
    </div>
  );
}

PDCarousel.propTypes = {
  areaChanger: PropTypes.object,
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
  currentPhotoIndex: PropTypes.number.isRequired,
  setCurrentPhotoIndex: PropTypes.func.isRequired,
};
