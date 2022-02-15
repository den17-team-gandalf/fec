import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PDStyle from './PDStyle';

export default function PDStyles({ styles, currentStyle, setCurrentStyle }) {
  // const styling = '2px solid black';
  // const clicky = (e) => {
  //   console.log(e.target.style)
  //   if (e.target.style.border === styling) {
  //     e.target.style.border === '2px solid green';
  //   } else {
  //     e.target.style.border === styling;
  //   }
  // };
  return (
    <div id="PDStylesContainer">
      <strong>Style > </strong>{currentStyle.name}<br/><br/>
    <div
      id="PDStyles"
      style={{
        display: 'grid', placeSelf: 'center', justifyItems: 'center', gridArea: 'styles', gridTemplateColumns: 'repeat(4, 70px)', gap: '10px',
      }}
    >
      {Object.keys(styles).length !== 0
      && styles.results.map((style) => (<PDStyle key={style.style_id} setCurrentStyle={setCurrentStyle} thisStyle={style}/>))}
    </div>
    </div>
  );
}

PDStyles.propTypes = {
  styles: PropTypes.object,
  setCurrentStyle: PropTypes.func,
};
