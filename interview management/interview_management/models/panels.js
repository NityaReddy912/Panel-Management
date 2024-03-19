const mongoose = require("mongoose");

const panelSchema = mongoose.Schema({
  panel_id: {
    type: Number,
  },

  user_id: {
    type: String,
  },

  contact: {
    type: String,
  },

  grade: {
    type: String,
  },

  panel_level: {
    type: String,
  },

  remarks: {
    type: String,
  },

  is_active: {
    type: Boolean,
  },

  created_by: {
    type: String,
  },

  created_on: {
    type: mongoose.SchemaTypes.Date,
    default: new Date(),
  },

  updated_by: {
    type: String,
    default: "",
  },

  updated_on: {
    type: mongoose.SchemaTypes.Date,
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
    type: mongoose.SchemaTypes.Date,
    default: "",
  },

  

});

module.exports = mongoose.model("panel", panelSchema);
