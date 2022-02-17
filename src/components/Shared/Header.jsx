import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header
      id="header"
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#303030',
        position: 'sticky',
        top: '0',
        left: '0',
        zIndex: '10',
        color: 'lightgray',
        display: 'grid',
        alignContent: 'center',
      }}
    >
      <span style={{ marginLeft: '15px' }}>
        <strong>Project Catwalk</strong>
        {' '}
        - Team Gandalf
        <span style={{ marginRight: '15px', position: 'fixed', right: '0px' }}>
          <input
            type="text"
            style={{
              color: 'lightgray', outline: '0', borderWidth: '0 0 1px', backgroundColor: '#303030',
            }}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </span>

    </header>
  );
}
