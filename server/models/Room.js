import mongoose from 'mongoose';
import { userSchema } from './User';
import { messageSchema } from './Message';

const roomSchema = new mongoose.Schema({
  roomID: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  rating: { type: Number, default: 0},
  users: [userSchema],
  messages: [messageSchema],
});

const Room = mongoose.model('Room', roomSchema);

export {roomSchema, Room};
