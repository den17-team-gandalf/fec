import React from 'react';
import axios from 'axios';
import contexts from './contexts';
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews';
import FAQ from './FAQ/FAQ';
import PDWidget from './PD/PDWidget';

let flag = true;

export default function App() {
  // const [products, setProducts] = React.useState([]);
  // if (flag) {
  //   flag = false;
  //   axios
  //     .get('/products')
  //     .then(({ data }) => setProducts(data))
  //     .catch(() => {});
  // }
  return (
    // <contexts.AppContext.Provider value={products}>
    <div>
      {/* <PDWidget /> */}
      <FAQ />
      {/* <RatingsAndReviews /> */}
    </div>
    // </contexts.AppContext.Provider>
  );
}
