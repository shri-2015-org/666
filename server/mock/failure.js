/* eslint no-console: 0 */
export const failureWithFunction = failureFunction => actions =>
  Object.keys(actions).reduce((result, fxName) => {
    const failMessage = failureFunction(fxName);
    if (failMessage) {
      console.log(`Action '${fxName}' will fail with message '${failMessage}'`);
      return {
        ...result,
        [fxName]: data => new Promise((resolve, reject) => reject(failMessage)),
      };
    }
    return {
      ...result,
      [fxName]: actions[fxName],
    };
  }, {});

export const failureWithMap = failureMap =>
  failureWithFunction(fxName => failureMap[fxName]);
export const failureAll = failMessage =>
  failureWithFunction(() => failMessage);
