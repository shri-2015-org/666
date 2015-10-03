/*
* Modified from https://github.com/elliotf/mocha-mongoose
*/

import config from './config';
import mongoose from 'mongoose';

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach( done => {
  function clearDB() {
    for (const i in mongoose.connection.collections) {
      if (mongoose.connection.collections.hasOwnProperty(i)) {
        mongoose.connection.collections[i].remove(function() {});
      }
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.test, err => {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach( done => {
  mongoose.disconnect();
  return done();
});
