import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  uid: { type: String, required: true },
});

const model = mongoose.model('User', schema);

export {schema, model};
