const mongoose = require("mongoose");

const userrolesSchema = mongoose.Schema({
  user_id: {
    type: String,
    maxLength: 20,
    required: true,
  },

  role_id: {
    type: Number,
    maxLength: 20,
  },

  is_active: {
    type: Boolean,
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

module.exports = mongoose.model(
  "user_roles",
  userrolesSchema,
);
