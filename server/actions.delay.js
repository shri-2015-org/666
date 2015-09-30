/* eslint no-console: 0 */
import * as pureActions from './actions.mock';

const delay = Number(process.env.SERVER_DELAY);
const actions = isNaN(delay) ? pureActions : Object.keys(pureActions)
  .reduce((result, fxName) => {
    console.log(`Function actions.${fxName} has delay ${delay} ms.`);
    return {
      ...result,
      [fxName]: function(data) {
        return new Promise((resolve, reject) => {
          setTimeout(() => pureActions[fxName](data)
            .then(resolve)
            .catch(reject),
          delay);
        });
      },
    };
  }, {});

export default actions;

