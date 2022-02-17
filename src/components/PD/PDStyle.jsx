import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';

export default function PDStyle({
  thisStyle, toggled, setToggled,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const clicky = () => {
    setCurrentStyle(thisStyle);
    setToggled(thisStyle.name);
  };
  return (
    <span style={{ display: 'block', position: 'relative' }}>
      <input
        type="image"
        onClick={(e) => {
          clicky(e);
        }}
        src={thisStyle.photos[0].thumbnail_url}
        alt={thisStyle.name}
        value={thisStyle}
        style={{
          borderRadius: '100%',
          width: '60px',
          height: '60px',
          border: '2px solid black',
          backgroundColor: 'black',
        }}
      />
      {toggled === thisStyle.name
      && (
      <FontAwesomeIcon
        icon={faCheck}
        style={{
          position: 'absolute', padding: '2px', top: '0', right: '0', color: 'green', borderRadius: '100%', backgroundColor: 'white', border: '2px solid black',
        }}
      />
      )}
    </span>
  );
}

PDStyle.propTypes = {
  thisStyle: PropTypes.object,
  currentStyle: PropTypes.object,
  toggled: PropTypes.string,
  setToggled: PropTypes.func,
  setCurrentStyle: PropTypes.func,
};
