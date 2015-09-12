export const SEND_MESSAGE = 'SEND_MESSAGE';

export function sendMessage (text) {
  return {
    type: SEND_MESSAGE,
    text,
  };
}
