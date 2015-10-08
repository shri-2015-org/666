const key = 'all-state';

export const writeState = ({getState}) => (next) => (action) => {
  const result = next(action);
  const state = JSON.stringify(getState());
  window.localStorage.setItem(key, state);
  return result;
};

export const readState = () => {
  let state;
  try {
    state = JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    // saved data is not valid
  }
  return state || {};
};

