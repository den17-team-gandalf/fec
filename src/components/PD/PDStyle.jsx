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
          width: '70px',
          height: '70px',
          border: '3px solid black',
        }}
      />
      {toggled === thisStyle.name
      && (
      <FontAwesomeIcon
        icon={faCheck}
        size="lg"
        style={{
          position: 'absolute', top: '0', right: '-8px', color: 'green',
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
