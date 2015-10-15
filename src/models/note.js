import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  title: String,
  date: Date,
  tags: [String],
  body: String,
});

const Note = mongoose.model('Note', noteSchema);

export { Note as default, noteSchema };