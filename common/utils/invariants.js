import { PropTypes } from 'react';

export const ArrayOf = t => PropTypes.arrayOf(t).isRequired;
export const Shape = s => PropTypes.shape(s).isRequired;
export const Str = PropTypes.string.isRequired;
export const Num = PropTypes.number.isRequired;
export const Bool = PropTypes.bool.isRequired;
export const OneOf = t => PropTypes.oneOfType(t).isRequired;
export const Func = () => PropTypes.func.isRequired;

function checkIt(value, reactChecker) {
  return reactChecker({standalone: value}, 'standalone', 'the typechecker', '');
}

export function assertInvariant(value, reactChecker) {
  const error = checkIt(value, reactChecker);
  if (error !== null) {
    console.log('assertType failed!');
    console.log('Value: ', value);
    // console.log('Type: ', reactChecker)
    throw error;
  }
}

export function checkInvariant(value, reactChecker) {
  const error = checkIt(value, reactChecker);
  return (error !== null);
}
