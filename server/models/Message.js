import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  roomID: { type: String, required: true },
  userID: { type: String, required: true },
  messageID: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: Number, required: true },
});

const model = mongoose.model('Message', schema);

export {schema, model};
