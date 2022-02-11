import React from 'react';

const AppContext = React.createContext('');
const DetailsContext = React.createContext({});
const QuestionsContext = React.createContext({});
const RatingsContext = React.createContext({});

export default {
  AppContext,
  DetailsContext,
  QuestionsContext,
  RatingsContext,
};
