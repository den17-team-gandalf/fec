import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function PDShop() {
  return (
    <div id="shop">
      <form>
        <select name="size" id="size">
          <option value="">SELECT SIZE</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        <input type="number" min="1" defaultValue="1" />
        <br />
        <input type="button" value="ADD TO CART" />
        <input type="button" value="*" />
      </form>
    </div>
  );
}
