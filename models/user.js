const { Schema, model } = require('mongoose');

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

// The next method allows extract the information necessary from the response
UserSchema.methods.toJSON = function () {
  // Extract from the answer the __v, password and the rest of information tha save in tha variable user
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  // return the information of the user
  return user;
};

// Export function using model
module.exports = model('User', UserSchema);
