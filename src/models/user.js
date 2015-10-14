import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  _creator: { type: String, ref: 'User'},
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

const noteModel = mongoose.model('Note', userSchema);
const userModel = mongoose.model('User', userSchema);

export default { User: userModel, Note: noteModel };
