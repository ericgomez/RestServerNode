const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'The role is required'],
  },
});

// The model requires 2 parameters, the first is the name and second is the Schema
module.exports = model('Role', RoleSchema);
