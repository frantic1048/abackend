import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
