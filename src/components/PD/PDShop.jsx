import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function PDShop() {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [currentSkuQ, setCurrentSkuQ] = React.useState({});
  const selectChanger = (e) => {
    setCurrentSkuQ(e.target.value);
  };
  return (
    <div id="shop">
      <form>
        <select onChange={(e) => selectChanger(e)} name="size" id="size">
          <option value="">SELECT SIZE</option>
          {Object.values(currentStyle.skus).map(
            (styleSize) => (
              <option
                key={Object.values(styleSize)}
                value={styleSize.quantity}
              >
                {styleSize.size}
              </option>
            ),
          )}
        </select>
        <input type="number" min="0" max={currentSkuQ} />
        <br />
        <input type="button" value="ADD TO CART" />
        <input type="button" value="*" />
      </form>
    </div>
  );
}
