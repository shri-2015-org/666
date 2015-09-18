import { PropTypes } from 'react';

function checkIt(value, reactChecker) {
  return reactChecker({standalone: value}, 'standalone', 'the typechecker', '');
}

export function assertInvariant(value, invariant) {
  const { reactChecker, description, name } = invariant;
  const error = checkIt(value, reactChecker);
  if (error !== null) {
    console.log('assertType failed!');
    console.log('Value: ', value);
    console.log('Invariant Description: ', description);
    if (name) { console.log('Invariant Name: ', name); }
    throw error;
  }
}

export function checkInvariant(value, invariant) {
  const { reactChecker } = invariant;
  const error = checkIt(value, reactChecker);
  return (error !== null);
}

function shapeToString(shape) {
  return 'Shape'; // TODO
}

function listToString(list) {
  return '[...]'; // TODO
}

function toString(t) {
  return t.name || t.description;
}

export const Named = (name, t) => Object.assign({}, t, {name});

export const Shape = s => ({
  reactChecker: PropTypes.shape(s).isRequired,
  description: shapeToString(s),
});

export const Str = ({
  reactChecker: PropTypes.string.isRequired,
  description: 'Str',
});

export const Num = ({
  reactChecker: PropTypes.number.isRequired,
  description: 'Num',
});

export const Bool = ({
  reactChecker: PropTypes.number.isRequired,
  description: 'Bool',
});

export const Exactly = t => ({
  reactChecker: PropTypes.oneOf([t]).isRequired,
  description: `Exactly(${toString(t)})`,
});

export const ArrayOf = t => ({
  reactChecker: PropTypes.arrayOf(t).isRequired,
  description: `ArrayOf(${toString(t)})`,
});

export const OneOf = (ts) => ({
  reactChecker: PropTypes.oneOfType(ts).isRequired,
  description: `OneOf(${listToString(ts)})`,
});

export const Enum = (ts) => ({
  reactChecker: PropTypes.oneOf(ts).isRequired,
  description: `Enum(...)`,
});

export const Func = () => ({ // TODO
  reactChecker: PropTypes.func.isRequired,
  description: 'Func(...)',
});

export const Invariant = ({ // TODO
  reactChecker: PropTypes.any.isRequired,
  description: 'Invariant',
});

export const MapOf = t => ({ // TODO
  reactChecker: PropTypes.any.isRequired,
  description: `MapOf(${toString(t)})`,
});

