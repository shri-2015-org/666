const re = /^[a-z0-9]+$/i;
export default roomID => !!(roomID.match(re));
