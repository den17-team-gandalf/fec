/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import axios from 'axios';
import PDCarousel from './PDCarousel';
import PDStyles from './PDStyles';
import PDInfo from './PDInfo';
import PDMainDisc from './PDMainDisc';
import PDShop from './PDShop';
import contexts from '../contexts';

let loaded = 0;

export default function PDWidget() {
  const styleHook = React.useState({});
  const [productStyles, setProductStyles] = React.useState({});
  const [currentPhoto, setCurrentPhoto] = React.useState('');
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [product, setProduct] = React.useState({});
  const [expanded, setExpanded] = React.useState(false);
  const areaChanger = React.useRef(0);

  const interactions = (e) => {
    const cTime = new Date().toLocaleTimeString();
    axios.post('/interactions', { element: `${e.target.tagName} .${e.target.className}`, widget: 'Product Details', time: cTime });
  };

  return (
    <contexts.AppContext.Consumer>
      {({ currentProduct }) => {
        if (loaded !== currentProduct) {
          loaded = currentProduct;
          axios.get(`products/${currentProduct}/styles`)
            .then(({ data }) => {
              setProductStyles(data);
              if (data.results.length !== 0) {
                styleHook[1](data.results[0]);
                setCurrentPhoto(data.results[0].photos[0].url);
              }
            })
            .catch(() => { });
          axios.get(`/products/${currentProduct}`)
            .then(({ data }) => {
              setProduct(data);
            })
            .catch(() => { });
        }
        return (
          <div
            className="PDWidget"
            ref={areaChanger}
            onClick={(e) => interactions(e)}
          >
            {(Object.keys(product).length !== 0 && currentPhoto !== '')
            && (
            <contexts.DetailsContext.Provider value={styleHook}>
              <PDCarousel
                currentPhotoIndex={currentPhotoIndex}
                setCurrentPhotoIndex={setCurrentPhotoIndex}
                areaChanger={areaChanger}
                expanded={expanded}
                setExpanded={setExpanded}
                currentPhoto={currentPhoto}
                setCurrentPhoto={setCurrentPhoto}
                styles={productStyles}
              />
              {!expanded
                && (
                  <>
                    <PDMainDisc expanded={expanded} product={product} />
                    <PDStyles
                      currentPhoto={currentPhoto}
                      setCurrentPhoto={setCurrentPhoto}
                      styles={productStyles}
                    />
                    <PDShop />
                  </>
                )}

              <PDInfo product={product} />
            </contexts.DetailsContext.Provider>
            )}

          </div>
        );
      }}
    </contexts.AppContext.Consumer>
  );
}
