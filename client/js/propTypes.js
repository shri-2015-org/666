import { PropTypes } from 'react';

export const messagesT = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired;

