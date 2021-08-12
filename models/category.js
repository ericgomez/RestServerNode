const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Exactly as it in the model name User
    required: true,
  },
});

// The model requires 2 parameters, the first is the name and second is the Schema
module.exports = model('Category', CategorySchema);
