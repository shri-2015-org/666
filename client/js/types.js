import { PropTypes } from 'react';

export const ArrayOf = t => PropTypes.arrayOf(t).isRequired;
export const Shape = s => PropTypes.shape(s).isRequired;
export const Str = PropTypes.string.isRequired;
export const Num = PropTypes.number.isRequired;
export const Bool = PropTypes.bool.isRequired;
export const OneOf = t => PropTypes.oneOfType(t).isRequired;
export const Func = () => PropTypes.func.isRequired;
