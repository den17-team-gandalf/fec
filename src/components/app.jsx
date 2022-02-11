import React from 'react';
import {appContext} from './contexts.js';

export default function App() {
  return (
    <appContext.Provider>
    <div>
      Hi
    </div>
    </appContext.Provider>
  );
}
