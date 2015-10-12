import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  title: String,
  date: Date,
  body: String,
});

const userSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
