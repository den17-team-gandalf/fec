import React from 'react';
import axios from 'axios';
import contexts from './contexts';
import Questions from './FAQ/FAQ';

export default function App() {
  const [products, setProducts] = React.useState([]);
  function fetch() {
    axios
      .get('/products')
      .then(({ data }) => setProducts(data))
      .catch(() => {});
  }
  return (
    <contexts.AppContext.Provider value={products}>
      <div>
        <button type="button" onClick={fetch}>
          click
        </button>
        {JSON.stringify(products)}
        <Questions />
      </div>
    </contexts.AppContext.Provider>
  );
}
