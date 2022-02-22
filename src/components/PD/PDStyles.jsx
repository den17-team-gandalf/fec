import React from 'react';
import PropTypes from 'prop-types';
import PDStyle from './PDStyle';
import contexts from '../contexts';

export default function PDStyles({ styles, currentPhoto, setCurrentPhoto }) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [toggled, setToggled] = React.useState(currentStyle.name);

  return (
    <div className="PDStylesContainer">
      <strong>
        Style
        {' '}
        {'>'}
        {' '}
      </strong>
      {currentStyle.name}
      <br />
      <br />
      <div className="PDStyles">
        {Object.keys(styles).length !== 0
        && styles.results.map((style) => (
          <PDStyle
            key={style.style_id}
            toggled={toggled}
            setToggled={setToggled}
            thisStyle={style}
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
          />
        ))}
      </div>
    </div>
  );
}

PDStyles.propTypes = {
  styles: PropTypes.object,
  currentPhoto: PropTypes.string.isRequired,
  setCurrentPhoto: PropTypes.func.isRequired,
};
