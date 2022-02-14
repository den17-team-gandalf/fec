import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import contexts from '../contexts';

export default function PDStyle({ thisStyle, setCurrentStyle }) {
  // if (Object.keys(currentStyle).length === 0) {
  //   axios.get('/products/44388/styles')
  //     .then(({ data }) => {
  //       const thisData = Object.entries(data);
  //       setCurrentStyle(thisData[1][1].indexOf(thisStyle));
  //       console.log(thisData[1][1].indexOf(thisStyle), thisStyle);
  //     })
  //     .catch(() => { });
  // }
  // const stl = React.useContext(contexts.DetailsContext);

  const styling = '2px solid black';
  const clicky = (e, thisStyle) => {
    setCurrentStyle(thisStyle);
    if (e.target.style.border === styling) {
      e.target.style.border = '2px dotted green';
    } else {
      e.target.style.border = styling;
    }
  };

  console.log(thisStyle);
  return (
    <input
      type="image"
      onClick={(e) => {
        clicky(e, thisStyle);
      }}
      src={thisStyle.photos[0].thumbnail_url}
      alt={thisStyle.name}
      value={thisStyle}
      style={{
        borderRadius: '100%', width: '80px', height: '80px', border: '2px solid black',
      }}
    />
  );
}

PDStyle.propTypes = {
  thisStyle: PropTypes.object,
  setCurrentStyle: PropTypes.func,
};
