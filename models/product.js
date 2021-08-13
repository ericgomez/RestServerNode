const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
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
    ref: 'User', //  It needs to be exactly as it in the model name User
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // It needs to be exactly as it in the model name Category
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: { type: String },
});

// The next method allows extract the information necessary from the response
ProductSchema.methods.toJSON = function () {
  // Extract from the answer the __v, status and the rest of information tha save in tha variable Product
  const { __v, status, ...product } = this.toObject();

  // return the information of the Product
  return product;
};

// The model requires 2 parameters, the first is the name and second is the Schema
module.exports = model('Product', ProductSchema);
