import React from 'react';
import contexts from '../contexts';
import PDCarouselSlide from './PDCarouselSlide';

export default function PDCarouselSlides() {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  return (
    <div>
      {currentStyle.photos.map((photo) => (<PDCarouselSlide thisPhoto={photo} />))}
    </div>
  );
}
