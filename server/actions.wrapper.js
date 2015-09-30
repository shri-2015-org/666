import _ from 'lodash';
import * as pureActions from './actions.mock';
import { delayWithFunction, delayAll } from './actions.delay';
import { failureWithFunction, failureAll } from './actions.failure';

// DELAY

const delay = Number(process.env.SERVER_DELAY);
const finalDelay = isNaN(delay) ? 750 : delay;

const delayModifier = (actions => {
  if (actions === '*') {
    return delayAll(finalDelay);
  }
  const words = _.words(actions);
  return delayWithFunction(word =>
    _.findWhere(words, word) ? finalDelay : undefined);
})(process.env.SERVER_DELAY_ACTIONS);

// FAILURE

const description = 'this action is blocked by SERVER_FAILURE_ACTIONS';

const failureModifier = (actions => {
  if (actions === '*') {
    return failureAll(description);
  }
  const words = _.words(actions);
  return failureWithFunction(word =>
  _.findWhere(words, word) ? description : undefined);
})(process.env.SERVER_FAILURE_ACTIONS);

//

export default _.compose(delayModifier, failureModifier)(pureActions);
