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
  notes: [noteSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
