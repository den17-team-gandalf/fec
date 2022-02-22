import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function Header({ products }) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [productNames, setProductNames] = React.useState([]);
  const [searching, setSearching] = React.useState('');
  React.useEffect(() => {
    // eslint-disable-next-line prefer-const
    let pNames = [];
    for (let i = 0; i < products.length; i++) {
      pNames.push(products[i].name);
    }
    setProductNames(pNames);
  }, [products]);
  const selectChanger = (e) => {
    setSearching(e.target.value);
  };
  const modeToggle = () => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
    setDarkMode(!darkMode);
  };
  return (
    <header className="header">
      <span className="hLogo">
        <strong>Project Catwalk</strong>
        {' '}
        - Team Gandalf -
        {' '}
        {' '}
        {' '}
        {' '}
        <FontAwesomeIcon onClick={() => modeToggle()} className="I_bulb" icon={faLightbulb} />
        <span className="hSearch">
          <select className="hInput" type="text" name="size" id="size" onChange={(e) => selectChanger(e)}>
            <option value="">Choose a Product...</option>
            {productNames
              .map(
                (productName) => (
                  <option
                    key={productName}
                    value={productName}
                  >
                    {productName}
                  </option>
                ),
              )}
          </select>
          {/* <FontAwesomeIcon className="I_headerSGlass" icon={faMagnifyingGlass} /> */}
        </span>
      </span>

    </header>
  );
}

Header.propTypes = {
  products: PropTypes.object,
};
