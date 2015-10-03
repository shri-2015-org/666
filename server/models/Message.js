import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  uid: { type: String, required: true },
  mid: { type: String, required: true },
  text: { type: String, required: true },
  time: Number,
  read: String,
  status: String,
});

const model = mongoose.model('Message', schema);

export {schema, model};
