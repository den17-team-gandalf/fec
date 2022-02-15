import React from 'react';
import axios from 'axios';
import contexts from './contexts';
// eslint-disable-next-line import/extensions
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews.jsx';
import PDWidget from './PD/PDWidget.jsx';

let flag = true;

export default function App() {
  const [products, setProducts] = React.useState([]);
  if (flag) {
    flag = false;
    axios.get('/products')
      .then(({ data }) => setProducts(data))
      .catch(() => { });
  }
  return (
    <contexts.AppContext.Provider value={products}>
      <div>
        {/* {JSON.stringify(products)} */}
        <PDWidget />
        <RatingsAndReviews />
      </div>
    </contexts.AppContext.Provider>
  );
}
