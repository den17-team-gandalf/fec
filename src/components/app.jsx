import React from 'react';
import axios from 'axios';
import contexts from './contexts';

export default function App() {
  const [products, setProducts] = React.useState([]);
  axios.get('/api/products')
    .then(({ data }) => setProducts(data))
    .catch(() => { });
  return (
    <contexts.AppContext.Provider value={products}>
      <div>
        {JSON.stringify(products)}
      </div>
    </contexts.AppContext.Provider>
  );
}
