import axios from 'axios';

export const instance = axios.create({
  headers: {
    'content-type': 'application/json',
  },
});

const getData = async url => {
  return instance({
    url: url,
    method: 'GET',
  });
};

export default {getData};
