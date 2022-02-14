import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PDStyle from './PDStyle';

export default function PDStyles({ styles, setCurrentStyle }) {
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
      <strong>Style > </strong><br/><br/>
    <div
      id="PDStyles"
      style={{
        display: 'grid', justifyItems: 'center', gridArea: 'styles', gridTemplateColumns: 'repeat(4, 90px)', gap: '15px',
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
