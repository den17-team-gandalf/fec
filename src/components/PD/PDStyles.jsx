import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PDStyle from './PDStyle';
import contexts from '../contexts';

export default function PDStyles({ styles }) {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [toggled, setToggled] = React.useState(currentStyle.name);
  return (
    <div id="PDStylesContainer">
      <strong>
        Style
        {' '}
        {'>'}
        {' '}
      </strong>
      {currentStyle.name}
      <br />
      <br />
      <div
        id="PDStyles"
        style={{
          display: 'grid', alignItems: 'center', justifyItems: 'center', gridArea: 'styles', gridTemplateColumns: 'repeat(4, 70px)', gap: '10px',
        }}
      >
        {Object.keys(styles).length !== 0
        && styles.results.map((style) => (
          <PDStyle
            key={style.style_id}
            toggled={toggled}
            setToggled={setToggled}
            thisStyle={style}
          />
        ))}
      </div>
    </div>
  );
}

PDStyles.propTypes = {
  styles: PropTypes.object,
  currentStyle: PropTypes.object,
  setCurrentStyle: PropTypes.func,
};
