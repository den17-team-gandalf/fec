import React from 'react';

const appContext = React.createContext({});
const detailsContext = React.createContext({});
const questionsContext = React.createContext({});
const ratingsContext = React.createContext({});

export default {
  appContext: appContext,
  detailsContext: detailsContext,
  questionsContext: questionsContext,
  ratingsContext: ratingsContext,
}
