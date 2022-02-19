import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';
import PDCarouselSlides from './PDCarouselSlides';

export default function PDCarousel({
  areaChanger, expanded, setExpanded, currentPhoto, setCurrentPhoto,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const carousel = React.createRef(0);
  const clicky = (e) => {
    if (e.target.className !== 'imgCard' && e.target.className !== 'imgCardContainer') {
      setExpanded(!expanded);
      if (expanded) {
        areaChanger.current.style.gridTemplateAreas = `
        "carousel carousel main"
        "carousel carousel styles"
        "carousel carousel shop"
        "details details details"
        `;
        carousel.current.style.cursor = 'zoom-in';
      } else {
        areaChanger.current.style.gridTemplateAreas = `
        "carousel carousel carousel"
        "carousel carousel carousel"
        "carousel carousel carousel"
        "details details details"
       `;
        carousel.current.style.cursor = 'cell';
      }
    }
  };
  return (
    <div className="PDCarousel" ref={carousel} onClick={(e) => clicky(e)}>
      <div className="cSlides">
        <PDCarouselSlides
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
        />
      </div>
      {currentPhoto === '' ? (
        <img
          src={currentStyle.photos[0].url}
          className="primaryImg"
          alt={currentStyle.name}
        />
      )
        : (
          <img
            src={currentPhoto}
            className="primaryImg"
            alt={currentStyle.name}
          />
        )}
      <FontAwesomeIcon className="I_expand" icon={faExpand} />
    </div>
  );
}

PDCarousel.propTypes = {
  areaChanger: PropTypes.object,
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
