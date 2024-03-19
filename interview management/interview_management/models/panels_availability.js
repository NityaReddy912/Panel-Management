const mongoose = require("mongoose");

const panels_availabilitySchema = mongoose.Schema({
  panel_availability_id: {
    type: Number,
    unique: true,
  },

  panel_id: {
    type: Number,
  },

  available_from_date: {
    type: Date,
  },

  available_to_date: {
    type: Date,
  },

  start_time: {
    type: String,
  },

  end_time: {
    type: String,
  },

  availability_status_id: {
    type: String,
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

module.exports = mongoose.model(
  "panels_availability",
  panels_availabilitySchema,
);
