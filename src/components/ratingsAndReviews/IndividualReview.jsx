import React from 'react';

// eslint-disable-next-line react/prop-types
export default function IndividualReview({ review }) {
  return (
    <li>
      this is a single review.
      {JSON.stringify(review)}
    </li>
  );
}
