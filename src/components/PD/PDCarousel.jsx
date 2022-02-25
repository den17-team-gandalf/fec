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
  const [superZoomed, setSuperZoomed] = React.useState(false);

  const carousel = React.useRef(0);
  const pImage = React.useRef(0);

  const photoIndexerR = () => {
    setCurrentPhotoIndex(currentPhotoIndex + 1);
    setCurrentPhoto(currentStyle.photos[currentPhotoIndex + 1].url);
  };

  const photoIndexerL = () => {
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
        pImage.current.style.width = '450px';
        pImage.current.style.cursor = 'zoom-in';
        carousel.current.style.cursor = 'zoom-in';
        carousel.current.style.width = '800px';
        setSuperZoomed(false);
        // If in expanded view and clicking on container or image...
      } else if (expanded
        && (e.target.className === 'primaryImg'
        || e.target.className === 'PDCarousel')) {
        // If not zoomed in yet...
        if (pImage.current.style.cursor === '' || pImage.current.style.cursor === 'zoom-in') {
          pImage.current.style.width = '900px';
          pImage.current.style.cursor = 'zoom-out';
          carousel.current.style.cursor = 'zoom-out';
          setSuperZoomed(true);
        // If already zoomed in...
        } else {
          pImage.current.style.width = '450px';
          pImage.current.style.cursor = '';
          carousel.current.style.cursor = '';
          setSuperZoomed(false);
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
        carousel.current.style.width = '1200px';
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
        {currentPhotoIndex !== 0 && !superZoomed
        && (
        <FontAwesomeIcon
          className="I_left"
          icon={faArrowLeft}
          size="lg"
          onClick={(e) => photoIndexerL(e)}
        />
        )}
      </div>
      {currentPhoto === '' || !currentStyle.photos[currentPhotoIndex] ? (
        <img
          ref={pImage}
          src={currentStyle.photos[0].url}
          className="primaryImg"
          alt={currentStyle.name}
          style={{ width: '450px' }}
        />
      )
        : (
          <img
            ref={pImage}
            src={currentStyle.photos[currentPhotoIndex].url}
            className="primaryImg"
            alt={currentStyle.name}
            style={{ width: '450px' }}
          />
        )}
      <FontAwesomeIcon
        className="I_expand"
        icon={faExpand}
        size="xl"
      />
      {currentStyle.photos.length - 1 !== currentPhotoIndex && !superZoomed
      && (
        <FontAwesomeIcon
          className="I_right"
          icon={faArrowRight}
          size="lg"
          onClick={(e) => photoIndexerR(e)}
        />
      )}
    </div>
  );
}

PDCarousel.propTypes = {
  areaChanger: PropTypes.object,
  currentPhoto: PropTypes.string,
  setCurrentPhoto: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
  currentPhotoIndex: PropTypes.number.isRequired,
  setCurrentPhotoIndex: PropTypes.func.isRequired,
};
