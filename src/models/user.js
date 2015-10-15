import mongoose, { Schema } from 'mongoose';

import { noteSchema } from './note';

const userSchema = new Schema({
  id: String,
  name: String,
  password: String,
  admin: Boolean,
  notes: [noteSchema],
});

const User = mongoose.model('User', userSchema);

export { User as default, userSchema };
