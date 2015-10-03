import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  roomID: { type: String, required: true },
  userID: { type: String, required: true },
  secret: { type: String, required: true },
  avatar: { type: String },
  nick: { type: String },
});

const model = mongoose.model('User', schema);

export {schema, model};
