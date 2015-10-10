import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomID: { type: String, required: true },
  userID: { type: String, required: true },
  messageID: { type: String, required: true, index: { unique: true } },
  text: { type: String, required: true },
  time: { type: Number, required: true },
});

const Message = mongoose.model('Message', messageSchema);

export {messageSchema, Message};
