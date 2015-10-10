import config from './development';

export default Object.assign(config, {
  db: {
    host: 'mongodb://localhost/anonymClub-test',
  },
  socket: {
    port: 3002,
  },
});
