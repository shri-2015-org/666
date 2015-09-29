const API = {
  JOIN_ROOM: {
    EMPTY_DATA: 'JoinRoom Error: "data" is not defined',
    EMPTY_ROOM_ID: 'JoinRoom Error: "roomID" is not defined',
    INVALID_ROOM_ID: 'JoinRoom Error: "roomID" is not valid',
    DEFUNCT_ROOM: 'JoinRoom Error: room does not exist',
  },
  LEAVE_ROOM: {
    EMPTY_DATA: 'LeaveRoom Error: "data" is not defined',
    EMPTY_ROOM_ID: 'LeaveRoom Error: "roomID" is not defined',
    EMPTY_USER_ID: 'LeaveRoom Error: "userID" is not defined',
    EMPTY_SECRET: 'LeaveRoom Error: "secret" is not defined',
    INVALID_ROOM_ID: 'LeaveRoom Error: "roomID" is not valid',
    INVALID_USER_ID: 'LeaveRoom Error: "userID" is not valid',
    INVALID_SECRET: 'LeaveRoom Error: "secret" is not valid',
    DEFUNCT_ROOM: 'LeaveRoom Error: room does not exist',
    DEFUNCT_USER: 'LeaveRoom Error: user does not exist',
    WRONG_SECRET: 'LeaveRoom Error: wrong "secret"',
  },
  MESSAGE: {
    EMPTY_DATA: 'Message Error: "data" is not defined',
    EMPTY_ROOM_ID: 'Message Error: "roomID" is not defined',
    EMPTY_USER_ID: 'Message Error: "userID" is not defined',
    EMPTY_SECRET: 'Message Error: "secret" is not defined',
    EMPTY_TEXT: 'Message Error: "text" is not defined',
    EMPTY_TIME: 'Message Error: "time" is not defined',
    INVALID_ROOM_ID: 'Message Error: "roomID" is not valid',
    INVALID_USER_ID: 'Message Error: "userID" is not valid',
    INVALID_SECRET: 'Message Error: "secret" is not valid',
    INVALID_TEXT: 'Message Error: "text" is not valid',
    INVALID_TIME: 'Message Error: "time" is not valid',
    DEFUNCT_ROOM: 'Message Error: room does not exist',
    DEFUNCT_USER: 'Message Error: user does not exist',
    WRONG_SECRET: 'Message Error: wrong "secret"',
  },
  GET_TOP: {

  },
};

export {API};
