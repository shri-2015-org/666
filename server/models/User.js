import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  roomID: { type: String, required: true },
  userID: { type: String, required: true },
  secret: { type: String, required: true },
  avatar: { type: String, required: true },
  nick: { type: String, required: true },
});

const model = mongoose.model('User', schema);

export {schema, model};
