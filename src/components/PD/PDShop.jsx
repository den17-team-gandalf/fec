import React from 'react';
import axios from 'axios';
import contexts from '../contexts';

export default function PDShop() {
  const [currentStyle, setCurrentStyle] = React.useContext(contexts.DetailsContext);
  const [currentSku, setCurrentSku] = React.useState('');
  const [currentSkuQ, setCurrentSkuQ] = React.useState('1');
  const [totalSkuQ, setTotalSkuQ] = React.useState('');
  const selectEl = React.useRef(0);
  const inputEl = React.useRef(0);

  const selectChanger = (e) => {
    setTotalSkuQ(e.target.value.slice(e.target.value.indexOf(',') + 1, e.target.value.length));
    setCurrentSku(e.target.value.slice(0, e.target.value.indexOf(',')));
    setCurrentSkuQ('1');
    if (totalSkuQ === '0') {
      selectEl.current.value = 'OUT OF STOCK';
    } else {
      inputEl.current.value = 1;
    }
  };

  const inputChanger = (e) => {
    setCurrentSkuQ(e.target.value);
  };

  const add2Cart = (e) => {
    e.preventDefault();
    let once = true;
    for (let i = 0; i < Number(currentSkuQ); i++) {
      axios.post('/cart', { sku_id: currentSku })
        // eslint-disable-next-line no-loop-func
        .then(() => {
          if (once) {
            // eslint-disable-next-line no-alert
            alert('Successfully added to bag!');
            once = false;
          }
        })
        .catch(() => { });
    }
  };

  return (
    <div className="PDShop">
      <form className="shopForm" onSubmit={(e) => add2Cart(e)}>
        {/* Size Selector */}
        <select
          ref={selectEl}
          className="sizeSelector"
          onChange={(e) => selectChanger(e)}
          name="size"
          id="size"
          required
        >
          <option value="">SELECT SIZE</option>
          {Object.entries(currentStyle.skus)
            .filter(
              (clothingStyle) => clothingStyle[1].quantity !== 0,
            )
            .map(
              (clothingStyle) => (
                <option
                  key={clothingStyle[0]}
                  value={[clothingStyle[0], clothingStyle[1].quantity]}
                >
                  {clothingStyle[1].size}
                </option>
              ),
            )}
        </select>
        {' '}
        {' '}
        {' '}
        {/* Quantity Selector */}
        {Object.keys(totalSkuQ).length === 0
          ? (
            <input
              className="quantitySelector"
              ref={inputEl}
              type="text"
              placeholder="-"
              readOnly
              required
            />
          )
          : (
            <input
              className="quantitySelector"
              ref={inputEl}
              type="number"
              defaultValue="1"
              onChange={(e) => inputChanger(e)}
              min="1"
              max={totalSkuQ > 15 ? '15' : totalSkuQ}
              required
            />
          )}
        <br />
        <br />
        {/* Submit Button */}
        {totalSkuQ !== '0' || selectEl.current.value === ''
          ? (
            <input
              className="addToBag"
              type="submit"
              value="ADD TO BAG"
            />
          )
          : <div />}

      </form>
    </div>
  );
}
