const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
  role_id: {
    type: String,
    unique: true,
    required: true,
  },
  role_name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  created_by: {
    type: String,
    maxlength: 50,
  },
  created_on: {
    type: Date,
  },
  updated_by: {
    type: String,
    maxLength: 50,
    default: "",
  },
  updated_on: {
    type: Date,
    default: "",
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_by: {
    type: String,
    default: "",
  },
  deleted_on: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("roles", rolesSchema);
