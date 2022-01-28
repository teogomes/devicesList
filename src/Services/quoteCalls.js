import api from './api';

export const getQuoteOfTheDay = () => {
  return api.getData('https://zenquotes.io/api/today');
};
