const env = process.env.NODE_ENV || 'production';
const dbHost = 'mongodb://' + (process.env.DB_HOST || 'localhost');

const production = {
  hotReload: false,
  httpPort: 80,
  socketPort: 8080,
  dbHost: dbHost + '/anonymClub-prod',
};

const config = ( (base, enviroment) => {
  switch (enviroment) {
    case 'development':
      return {
        ...base,
        hotReload: true,
        httpPort: 8080,
        socketPort: 3001,
        dbHost: dbHost + '/anonymClub-dev',
      };
    case 'testing':
      return {
        ...base,
        httpPort: 8080,
        socketPort: 3002,
        dbHost: dbHost + '/anonymClub-test',
      };
    default:
      return base;
  }
} )(production, env);

export default {
  ...config,
  env,
  httpPort: process.env.HTTP_PORT || config.httpPort,
  socketPort: process.env.SOCKET_PORT || config.socketPort,
};

