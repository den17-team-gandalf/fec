import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FAQFetchList(id = 44388) {
  const [renderList, setRenderList] = useState(null);
  // axios get request for all question in beginning
  // dependency should be on product id, need to be added
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `/qa/questions?product_id=${id}&count=1000`
      );
      setRenderList(response.data);
    })();
  }, [id]);

  return renderList;
}
