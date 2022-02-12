import React from 'react';
import axios from 'axios';
import AppContext from './contexts';

export default function App() {
  axios.post('/products')
    .then((res) => {
      console.log(res);
    });
  return (
    // <AppContext>
    <div>
      Hi
    </div>
    // {/* </AppContext> */}
  );
}
