const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true,
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

// The next method allows extract the information necessary from the response
CategorySchema.methods.toJSON = function () {
  // Extract from the answer the __v, status and the rest of information tha save in tha variable category
  const { __v, status, ...category } = this.toObject();

  // return the information of the category
  return category;
};

// The model requires 2 parameters, the first is the name and second is the Schema
module.exports = model('Category', CategorySchema);
