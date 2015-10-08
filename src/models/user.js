import {Schema, model} from 'mongoose';

export default model('User', new Schema({
  name: String,
  password: String,
}));
