import config from './production';

export default Object.assign(config, {
  db: {
    host: 'mongodb://localhost/anonymClub-dev',
  },
  socket: {
    port: 3001,
  },
});
