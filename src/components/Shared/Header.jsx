import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import contexts from '../contexts';

export default function Header() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [searching, setSearching] = React.useState('');
  return (
    <contexts.AppContext.Consumer>
      {(products) => {
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
