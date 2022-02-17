import React from 'react';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function PDCarouselSlide({ thisPhoto }) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  return (
    <div id="imgCard">
      <input
        type="image"
        // onClick={(e) => {
        //   clicky(e);
        // }}
        src={thisPhoto.thumbnail_url}
        alt="Carousel Style Image"
        value={thisPhoto}
        style={{
          width: '60px',
          height: '60px',
          border: '2px solid black',
          backgroundColor: 'black',
        }}
      />
    </div>
  );
}

PDCarouselSlide.propTypes = {
  thisPhoto: PropTypes.object,
};
