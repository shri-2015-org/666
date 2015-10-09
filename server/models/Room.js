import mongoose from 'mongoose';
import * as User from './User';
import * as Message from './Message';

const schema = new mongoose.Schema({
  roomID: { type: String, required: true, index: true },
  name: { type: String, required: true },
  rating: { type: Number, default: 0},
  users: [User.schema],
  messages: [Message.schema],
});

const model = mongoose.model('Room', schema);

export {schema, model};
