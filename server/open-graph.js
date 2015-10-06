import getUrls from 'get-urls';
import ogs from 'open-graph-scraper';

export const fetchMetas = (text, callback) => {
  const urls = getUrls(text);
  urls.forEach((url, index) => {
    ogs({url, timeout: 2000}, (error, meta) => {
      if (error) {
        console.log('fetchMetas error', error);
        // TODO handle error?
        return;
      }
      // console.log(meta);
      callback(url, index, meta);
    });
  });
};

