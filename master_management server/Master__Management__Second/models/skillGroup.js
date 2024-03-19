const mongoose = require("mongoose");

const skillGroupSchema = mongoose.Schema({
  candidate_role_id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  candidate_roles: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  created_by: {
    type: String,
    trim: true,
    lowercase: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: String,
    trim: true,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  is_deleted: {
    type: Boolean,
  },
  deleted_by: {
    type: String,
    trim: true,
  },
  deleted_on: {
    type: Date,
    default: Date.now,
  },
});

const SkillGroup = mongoose.model(
  "candidate_roles",
  skillGroupSchema,
);

module.exports = SkillGroup;
