import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export default function useGetInfo(id = 44388) {
  const [FAQData, setFAQdata] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `/qa/questions?product_id=${id}&count=1000`,
      ); // /reviews/meta/?product_id=44388'
      setFAQdata(response.data);
    })();
  }, []);
  return FAQData;
}
