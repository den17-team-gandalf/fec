import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';

export default function PDStyle({
  thisStyle, toggled, setToggled, currentPhoto, setCurrentPhoto,
}) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);

  const clicky = () => {
    setCurrentStyle(thisStyle);
    setToggled(thisStyle.style_id);
    setCurrentPhoto(thisStyle.photos[0].url);
  };

  return (
    <span className="PDStyle">
      <input
        className="PDStyleImg"
        type="image"
        onClick={(e) => {
          clicky(e);
        }}
        src={thisStyle.photos[0].thumbnail_url}
        alt={thisStyle.name}
        value={thisStyle}
      />
      {toggled === thisStyle.style_id
      && (
      <FontAwesomeIcon className="I_checksS" icon={faCheck} />
      )}
    </span>
  );
}

PDStyle.propTypes = {
  thisStyle: PropTypes.object,
  toggled: PropTypes.number.isRequired,
  setToggled: PropTypes.func.isRequired,
  currentPhoto: PropTypes.string,
  setCurrentPhoto: PropTypes.func.isRequired,
};
