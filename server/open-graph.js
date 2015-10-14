import getUrls from 'get-urls';
import ogs from 'open-graph-scraper';

export const fetchMetas = text => {
  const urls = getUrls(text);
  return urls.map((url, index) => {
    return new Promise((resolve, reject) => {
      ogs({url, timeout: 5000}, (error, meta) => {
        if (error) {
          console.log('fetchMetas error', error);
          return reject(error);
        }
        return resolve({url, index, meta});
      });
    });
  });
};

