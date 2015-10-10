function throwWhen(condition) {
  if (!condition) {
    throw new Error('API check failed.');
  }
}

const loud = (name, check) => data => check(data);

const silent = (name, check) => data => {
  try {
    check(data);
  } catch (e) {
    console.log(`API check failed for ${name}... Ignoring!`);
    console.log(data);
    return false;
  }

  return true;
};

const wrap = NODE_ENV === 'production' ? silent : loud;

export const topRooms = wrap('topRooms', data => {
  throwWhen(data.rooms instanceof Array);
  data.rooms.forEach(room => {
    throwWhen(typeof room.roomID === 'string');
    throwWhen(typeof room.name === 'string');
    throwWhen(typeof room.users === 'number');
    throwWhen(typeof room.rating === 'number');
  });
  return true;
});

export const message = wrap('message', data => {
  throwWhen(typeof data.roomID === 'string');
  throwWhen(typeof data.userID === 'string');
  throwWhen(typeof data.messageID === 'string');
  throwWhen(typeof data.text === 'string');
  throwWhen(typeof data.time === 'number');
  return true;
});

export const attachment = wrap('attachment', data => {
  throwWhen(typeof data.roomID === 'string');
  throwWhen(typeof data.messageID === 'string');
  throwWhen(typeof data.url === 'string');
  throwWhen(typeof data.index === 'number');
  throwWhen(data.meta);
  return true;
});

export const joinUser = wrap('joinUser', data => {
  throwWhen(typeof data.roomID === 'string');
  throwWhen(typeof data.userID === 'string');
  throwWhen(typeof data.avatar === 'string');
  throwWhen(typeof data.nick === 'string');
  return true;
});

export const leaveUser = wrap('leaveUser', data => {
  throwWhen(typeof data.roomID === 'string');
  throwWhen(typeof data.userID === 'string');
  return true;
});

export const joinRoom = wrap('joinRoom', res => {
  throwWhen(res instanceof Object);
  if (res.status === 'OK') {
    throwWhen(res.data instanceof Object);
    throwWhen(res.data.identity instanceof Object);
    throwWhen(typeof res.data.identity.userID === 'string');
    throwWhen(typeof res.data.identity.avatar === 'string');
    throwWhen(typeof res.data.identity.nick === 'string');
    throwWhen(typeof res.data.identity.secret === 'string');
    throwWhen(res.data.room instanceof Object);
    throwWhen(typeof res.data.room.roomID === 'string');
    throwWhen(typeof res.data.room.name === 'string');
    throwWhen(res.data.room.users instanceof Array);
    res.data.room.users.forEach(user => {
      throwWhen(typeof user.roomID === 'string');
      throwWhen(typeof user.userID === 'string');
      throwWhen(typeof user.avatar === 'string');
      throwWhen(typeof user.nick === 'string');
    });
    return true;
  }
  throwWhen(res.status === 'ERROR');
  throwWhen(typeof res.description === 'string');
  return true;
});

export const leaveRoom = wrap('leaveRoom', res => {
  throwWhen(res instanceof Object);
  if (res.status === 'OK') {
    return true;
  }
  throwWhen(res.status === 'ERROR');
  throwWhen(typeof res.description === 'string');
  return true;
});

// FIXME имя не совпадает с API, т.к. message уже есть выше.
export const messageExchange = wrap('messageExchange', res => {
  throwWhen(res instanceof Object);
  if (res.status === 'OK') {
    throwWhen(res.data instanceof Object);
    throwWhen(typeof res.data.roomID === 'string');
    throwWhen(typeof res.data.userID === 'string');
    throwWhen(typeof res.data.messageID === 'string');
    throwWhen(typeof res.data.text === 'string');
    throwWhen(typeof res.data.time === 'number');
    return true;
  }
  throwWhen(res.status === 'ERROR');
  throwWhen(typeof res.description === 'string');
  return true;
});

export const searchRoomID = wrap('searchRoomID', res => {
  throwWhen(res instanceof Object);
  if (res.status === 'OK') {
    throwWhen(res.data instanceof Array);
    res.data.forEach(room => {
      throwWhen(room instanceof Object);
      throwWhen(typeof room.roomID === 'string');
      throwWhen(typeof room.name   === 'string');
      throwWhen(typeof room.users  === 'number');
      throwWhen(typeof room.rating === 'number');
    });
    return true;
  }
  throwWhen(res.status === 'ERROR');
  throwWhen(typeof res.description === 'string');
  return true;
});

export const createRoom = wrap('createRoom', res => {
  throwWhen(res instanceof Object);
  if (res.status === 'OK') {
    return true;
  }
  throwWhen(res.status === 'ERROR');
  throwWhen(typeof res.description === 'string');
  return true;
});

