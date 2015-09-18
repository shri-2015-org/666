import { PropTypes } from 'react';
import _ from 'lodash';

function checkIt(value, reactChecker) {
  return reactChecker({standalone: value}, 'standalone', 'the typechecker', '');
}

export function assertInvariant(value, invariant) {
  const { reactChecker, description, name } = invariant;
  const error = checkIt(value, reactChecker);
  if (error !== null) {
    console.log('assertType failed!');
    if (name) { console.log('Invariant Name: ', name); }
    console.log('Invariant Description: ', description);
    console.log('Value: ', value);
    throw error;
  }
}

export function checkInvariant(value, invariant) {
  const { reactChecker } = invariant;
  const error = checkIt(value, reactChecker);
  return (error !== null);
}

function toString(inv) {
  return inv.name || inv.description;
}

export const toPropTypes = object => _.mapValues(object, inv => inv.reactChecker);

const shapeToString = shape =>
  'Shape(' + JSON.stringify(_.mapValues(shape, inv => toString(inv))) + ')';

function listToString(list) {
  return '[...]'; // TODO
}

export const Named = (name, inv) => Object.assign({}, inv, {name});

export const Shape = s => ({
  reactChecker: PropTypes.shape(_.mapValues(s, inv => inv.reactChecker)).isRequired,
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

export const Exactly = value => ({
  reactChecker: PropTypes.oneOf([value]).isRequired,
  description: `Exactly(${value})`,
});

export const ArrayOf = t => ({
  reactChecker: PropTypes.arrayOf(t.reactChecker).isRequired,
  description: `ArrayOf(${toString(t)})`,
});

export const OneOf = (invs) => ({
  reactChecker: PropTypes.oneOfType(_.map(invs, inv => inv.reactChecker)).isRequired,
  description: `OneOf(${listToString(invs)})`,
});

export const Enum = (values) => ({
  reactChecker: PropTypes.oneOf(values).isRequired,
  description: `Enum(${values})`,
});

export const Func = () => ({
  reactChecker: PropTypes.func.isRequired,
  description: 'Func(?)',
});

export const Invariant = ({ // TODO
  reactChecker: PropTypes.any.isRequired,
  description: 'Invariant',
});

export const MapOf = inv => ({ // TODO
  reactChecker: PropTypes.any.isRequired,
  description: `MapOf(${toString(inv)})`,
});

export const Any = ({
  reactChecker: PropTypes.any,
  description: 'Any',
});


