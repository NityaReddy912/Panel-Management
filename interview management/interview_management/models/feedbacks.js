const mongoose = require("mongoose");

const feedbacksSchema = mongoose.Schema({
  feedback_id: {
    type: Number,

    unique: true,
  },

  Skills: [
    {
      Skill_Name: {
        type: String,
      },

      Rating: {
        type: Number,
      },

      Skill_Remark: {
        type: String,

        maxLength: 150,
      },
    },
  ],

  created_by: {
    type: String,

    maxLength: 50,
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

    default: false,
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

module.exports = mongoose.model(
  "feedback_temps",
  feedbacksSchema,
);
