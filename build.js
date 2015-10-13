import fs from 'fs';
import webpack from 'webpack';

import config from './config/webpack.prod';

webpack(config, (err, res) => {
  if (err) return console.log(err);
  return console.log(res.toString());
});

fs.readFile('package.json', (err, data) => {
  if (err) throw err;
  const orig = JSON.parse(data);
  const pack = {
    name: orig.name,
    version: orig.version,
    description: orig.description,
    scripts: {
      start: 'bash start.sh; bash;',
    },
    dependencies: orig.dependencies,
    author: orig.author,
  };
  console.log(pack);
  fs.writeFile('build/package.json', JSON.stringify(pack, null, 2), () => {
    console.log('package.json added');
  });
});

