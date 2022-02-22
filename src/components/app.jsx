import React from 'react';
import axios from 'axios';
import contexts from './contexts';
// eslint-disable-next-line import/extensions
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews';
import PDWidget from './PD/PDWidget';
import Header from './Shared/Header';
import FAQ from './FAQ/FAQ';

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
    <div className="appContents">
      <contexts.AppContext.Provider value={products}>
        <Header products={products} />
        {Object.keys(products).length !== 0 ? (
          <>
            <PDWidget />
            <RatingsAndReviews />
            <FAQ />
          </>
        )
          : (
            <div className="loaderContainer">
              <div className="loader" />
            </div>
          )}
      </contexts.AppContext.Provider>
    </div>
  );
}
