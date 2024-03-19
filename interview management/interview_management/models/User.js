const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    maxLength: 100,
    required: true,
  },

  email: {
    type: String,
    maxLength: 100,
    required: true,
  },

  is_active: {
    type: Boolean,
    required: true,
  },

  password: {
    type: String,
    maxLength: 100,
    required: true,
  },

  created_by: {
    type: String,
    maxLength: 50,
    required: true,
  },

  created_on: {
    type: Date,
    required: true,
  },

  updated_by: {
    type: String,
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

  Token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
