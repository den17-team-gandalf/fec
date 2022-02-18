import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="header">
      <span className="hLogo">
        <strong>Project Catwalk</strong>
        {' '}
        - Team Gandalf
        <span className="hSearch">
          <input className="hInput" type="text" />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </span>

    </header>
  );
}
