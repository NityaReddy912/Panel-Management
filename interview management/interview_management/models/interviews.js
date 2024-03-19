const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(
  mongoose,
);

const interviewsSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  panel_availability_id: {
    type: Number,
  },
  candidate_id: {
    type: String,
  },
  interview_status_id: {
    type: Number,
  },
  type_id: {
    type: String,
    maxLength: 20,
  },
  remark: {
    type: String,
    maxLength: 250,
  },
  feedback_id: {
    type: Number,
  },

  created_by: {
    type: String,
  },

  created_on: {
    type: mongoose.SchemaTypes.Date,
    default: new Date(),
  },
  update_by: {
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
  },
  deleted_by: {
    type: String,
    maxLength: 50,
    default: "",
  },
  deleted_on: {
    type: Date,
    default: "",
  },
});

interviewsSchema.plugin(autoIncrement, {
  inc_field: "id",
  start_seq: "9000",
  collection_name: "interview-id",
});

interviewsSchema.plugin(autoIncrement, {
  inc_field: "feedback_id",
  start_seq: "9000",
  collection_name: "feedback-id",
});

interviewsSchema.plugin(autoIncrement, {
  inc_field: "interveiw_status_id",
  start_seq: "9000",
  collection_name: "interveiw-status-id",
});

module.exports = mongoose.model(
  "interviews",
  interviewsSchema,
);
