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
  const clicky = () => {
    setExpanded(!expanded);
    if (expanded) {
      areaChanger.current.style.gridTemplateAreas = `
        "carousel carousel main"
        "carousel carousel styles"
        "carousel carousel shop"
        "details details details"
    `;
    } else {
      areaChanger.current.style.gridTemplateAreas = `
        "carousel carousel carousel"
        "carousel carousel carousel"
        "carousel carousel carousel"
        "details details details"
    `;
    }
  };
  return (
    <div className="PDCarousel">
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
      <FontAwesomeIcon onClick={(e) => { clicky(e); }} className="I_expand" icon={faExpand} />
    </div>
  );
}

PDCarousel.propTypes = {
  areaChanger: PropTypes.object,
  currentStyle: PropTypes.object,
  currentPhoto: PropTypes.string,
  setCurrentPhoto: PropTypes.func,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
};
