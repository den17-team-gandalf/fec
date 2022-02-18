import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function PDShop() {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [currentSkuQ, setCurrentSkuQ] = React.useState({});
  const selectEl = React.useRef(0);
  const inputEl = React.useRef(0);
  const selectChanger = (e) => {
    setCurrentSkuQ(e.target.value);
    if (currentSkuQ === '0') {
      inputEl.current.value = 'OUT OF STOCK';
    } else {
      inputEl.current.value = 1;
    }
  };
  // React.useEffect(() => {
  //   inputEl.current = 0;
  // }, [currentSkuQ]);
  // React.useEffect(() => (<input type="number" min="0" max={currentSkuQ} />), [currentSkuQ]);
  return (
    <div className="PDShop">
      <form className="shopForm">
        <select
          ref={selectEl}
          className="sizeSelector"
          onChange={(e) => selectChanger(e)}
          name="size"
          id="size"
        >
          <option value="">SELECT SIZE</option>
          {Object.values(currentStyle.skus)
            .filter(
              (clothingStyle) => clothingStyle.quantity !== 0,
            )
            .map(
              (clothingStyle) => (
                <option
                  key={Object.values(clothingStyle)}
                  value={clothingStyle.quantity}
                >
                  {clothingStyle.size}
                </option>
              ),
            )}
        </select>
        {' '}
        {' '}
        {' '}
        {Object.keys(currentSkuQ).length === 0 ? <input className="quantitySelector" ref={inputEl} type="text" placeholder="-" readOnly />
          : (
            <input className="quantitySelector" ref={inputEl} type="number" defaultValue="1" min="1" max={currentSkuQ > 15 ? '15' : currentSkuQ} />
          )}
        <br />
        <br />
        <input
          className="addToBag"
          type="button"
          value="ADD TO BAG"
        />
      </form>
    </div>
  );
}
