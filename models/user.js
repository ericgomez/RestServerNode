const { Schema, model, modelNames } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'], //Defaults Options
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  },
});

// Export function using model
module.exports = model('User', UserSchema);
