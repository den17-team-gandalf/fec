import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLightbulb } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const modeToggle = (e) => {
    console.log(document.documentElement);
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
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
        <FontAwesomeIcon onClick={(e) => { modeToggle(e); }} className="I_bulb" icon={faLightbulb} />
        <span className="hSearch">
          <input className="hInput" type="text" />
          <FontAwesomeIcon className="I_headerSGlass" icon={faMagnifyingGlass} />
        </span>
      </span>

    </header>
  );
}
