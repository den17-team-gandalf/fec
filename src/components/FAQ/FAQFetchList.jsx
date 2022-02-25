import axios from 'axios';
import React, { useEffect, useState } from 'react';
import contexts from '../contexts';

export default function FAQFetchList() {
  const { currentProduct } = React.useContext(contexts.AppContext);
  const [renderList, setRenderList] = useState(null);
  // axios get request for all question in beginning
  // dependency should be on product id, need to be added
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `/qa/questions?product_id=${currentProduct}&count=1000`
      );
      setRenderList(response.data);
    })();
  }, [currentProduct]);

  return renderList;
}
