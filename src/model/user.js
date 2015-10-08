import mongoose from 'mongoose';

// FIXME: TypeError: Cannot read property 'modelSchemas' of undefined
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
