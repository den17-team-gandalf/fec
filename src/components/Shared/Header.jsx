import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import contexts from '../contexts';

export default function Header() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [searching, setSearching] = React.useState('');
  const [stones, setStones] = React.useState({});

  return (
    <contexts.AppContext.Consumer>
      {({
        products, currentProduct, updateCurrentProduct, setProducts,
      }) => {
        const modeToggle = () => {
          document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
          setDarkMode(!darkMode);
        };
        const selectChanger = (e) => {
          if (searching !== e.target.value) {
            setSearching(e.target.value);
            console.log('New selection', e.target.value);
            updateCurrentProduct(products.filter(({ name }) => name === e.target.value)[0].id);
          }
        };
        return (
          <header className="header">
            <span className="hLogo">
              <strong>Project Catwalk</strong>
              {' '}
              - Team Gandalf -
              {' '}
              <FontAwesomeIcon onClick={() => modeToggle()} className="I_bulb" icon={faLightbulb} style={!darkMode ? { boxShadow: '0px -5px 10px yellow' } : {}} />
              <span className="hSearch">
                <select className="hInput" type="text" name="productChanger" id="productChanger" onChange={selectChanger}>
                  {products
                    .map(
                      ({ name }) => (
                        <option
                          key={name}
                          value={name}
                        >
                          {name}
                        </option>
                      ),
                    )}
                  {/* {Object.keys(products).length !== 0
                  && (
                  <option
                    key={stones.name}
                    value={stones.name}
                  >
                    {stones.name}
                  </option>
                  )} */}
                </select>
                {/* <FontAwesomeIcon className="I_headerSGlass" icon={faMagnifyingGlass} /> */}
              </span>
            </span>
          </header>
        );
      }}
    </contexts.AppContext.Consumer>
  );
}

Header.propTypes = {
  products: PropTypes.array,
};
