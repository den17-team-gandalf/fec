import { useState } from 'react';

export default function ListMaker(input) {
 

  if (search) {
    let searchResult = currentList.map((q) => {
      if (q.question_body.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        return q;
      }
      return undefined;
    });
    searchResult = searchResult.filter((x) => x !== undefined);
    setOldList(currentList);
    setCurrentList(searchResult);
  }
  if (!search && oldList !== null) {
    setCurrentList(oldList);
  }

  return currentList;
}
