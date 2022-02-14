import React from 'react';
import axios from 'axios';
import contexts from './contexts';
import PDWidget from './PD/PDWidget';

export default function App() {
  const [products, setProducts] = React.useState([]);
  if (products.length === 0) {
    axios.get('/products')
      .then(({ data }) => setProducts(data))
      .catch(() => { });
  }
  return (
    <contexts.AppContext.Provider value={products}>
      <div>
        <PDWidget />
        {JSON.stringify(products)}
      </div>
    </contexts.AppContext.Provider>
  );
}
