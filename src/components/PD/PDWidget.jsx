import React from 'react';
import axios from 'axios';
import PDCarousel from './PDCarousel';
import PDStyles from './PDStyles';
import PDInfo from './PDInfo';
import PDMainDisc from './PDMainDisc';
import PDShop from './PDShop';
import contexts from '../contexts';

export default function PDWidget() {
  const styleHook = React.useState({
    style_id: 266902,
    name: 'Forest Green & Black',
    original_price: '140.00',
    sale_price: null,
    'default?': true,
    photos: [
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      },
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
      },
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
      },
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      },
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      },
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      },
    ],
    skus: {
      1549611: {
        quantity: 8,
        size: 'XS',
      },
      1549612: {
        quantity: 16,
        size: 'S',
      },
      1549613: {
        quantity: 17,
        size: 'M',
      },
      1549614: {
        quantity: 10,
        size: 'L',
      },
      1549615: {
        quantity: 15,
        size: 'XL',
      },
      1549616: {
        quantity: 4,
        size: 'XL',
      },
    },
  });
  const [productStyles, setProductStyles] = React.useState({});
  if (Object.keys(productStyles).length === 0) {
    axios.get('/products/44388/styles')
      .then(({ data }) => {
        setProductStyles(data);
      })
      .catch(() => { });
  }
  const [product, setProduct] = React.useState({});
  if (Object.keys(product).length === 0) {
    axios.get('/products/44388')
      .then(({ data }) => {
        setProduct(data);
      })
      .catch(() => { });
  }
  return (
    <div
      id="PDWidget"
      style={{
        display: 'grid',
        gridTemplateAreas: `
          'carousel carousel main'
          'carousel carousel styles'
          'carousel carousel shop'
          'details details details'
        `,
        width: 'auto',
        justifyContent: 'center',
      }}
    >
      <contexts.DetailsContext.Provider value={styleHook}>
        <PDCarousel
          styles={productStyles}
        />
        <PDMainDisc product={product} />
        <PDStyles
          styles={productStyles}
        />
        <PDShop />
        <PDInfo product={product} />
      </contexts.DetailsContext.Provider>
    </div>
  );
}
