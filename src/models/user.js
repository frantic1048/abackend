import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  id: String,
  name: String,
  key: String,
  salt: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
  }],
});

const User = mongoose.model('User', userSchema);

export { User as default, userSchema };
