import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type:String, unique: true, required: true},
  password: String,
  avatar: String //Adding string field in database for a 64-bit encoded image
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
