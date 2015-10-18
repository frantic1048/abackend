import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  _owner: {
    type: String,
    ref: 'User',
  },
  id: Number,
  title: String,
  date: Date,
  tags: [String],
  body: String,
});

const Note = mongoose.model('Note', noteSchema);

export { Note as default, noteSchema };
