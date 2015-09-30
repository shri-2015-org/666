/* eslint no-console: 0 */
import * as pureActions from './actions.mock';

export const delayWithFunction = delayFunction => actions =>
  Object.keys(actions).reduce((result, fxName) => {
    const delay = delayFunction(fxName);
    if (delay) {
      console.log(`Action ${fxName} has delay ${delay} ms.`);
      return {
        ...result,
        [fxName]: data => new Promise((resolve, reject) =>
          setTimeout(() =>
            actions[fxName](data).then(resolve, reject), delay)),
      };
    }
  }, {});

export const delayWithMap = delayMap =>
  delayWithFunction(fxName => delayMap[fxName]);
export const delayAll = delay =>
  delayWithFunction(() => delay);

/* old version
const delay = Number(process.env.SERVER_DELAY);
const actions = isNaN(delay) ? pureActions : Object.keys(pureActions)
  .reduce((result, fxName) => {
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

*/
