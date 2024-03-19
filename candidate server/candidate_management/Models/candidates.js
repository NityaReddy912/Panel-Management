const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const candidates = mongoose.Schema({
  // cid: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  id: {
    type: String,
  },
  sgo_id: {
    type: String,
    maxLength: 20,
  },
  // lead_id:{
  //     type:String,
  //     maxLength:20,
  // },
  recruiter_id: {
    type: String,
    maxLength: 20,
  },
  posting_srf: {
    type: String,
    maxLength: 20,
  },
  skill_id: {
    type: String,
    maxLength: 20,
  },
  taleo_candidate_id: {
    type: String,
    maxLength: 20,
  },
  source_date: {
    type: Date,
  },
  source_id: {
    type: String,
    maxLength: 20,
  },
  candidate_name: {
    type: String,
    required: true,
    maxLength: 200,
  },
  pan: {
    type: String,
  },
  status: {
    type: String,
    default: "010 Screening",
    required: false,
  },
  contact: {
    type: String,
    required: true,
    maxLength: 13,
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
  },
  // primary_skill_id:{
  //     type:String,
  //     maxLength:20,
  // },
  it_experience_years: {
    type: String,
    maxLength: 3,
  },
  current_company: {
    type: String,
    maxLength: 200,
  },
  current_location: {
    type: String,
    maxLength: 200,
  },
  prefered_location: {
    type: String,
    maxLength: 200,
  },
  current_ctc: {
    type: String,
    maxLength: 15,
  },
  expected_ctc: {
    type: String,
    maxLength: 15,
  },
  offer_in_hand: {
    type: String,
    maxLength: 15,
  },
  notice_period_in_days: {
    type: String,
    maxLength: 5,
  },
  additional_remark: {
    type: String,
    maxLength: 5,
  },
  candidate_status_id: {
    type: String,
    maxLength: 5,
  },
  // is_screen_selected:{
  //     type:Boolean,
  // },
  // screen_by:{
  //     type:String,
  //     maxLength:20,
  // },
  // screen_on:{
  //     type:Date,
  // },
  // offered_srf:{
  //     type:String,
  //     maxLength:20,
  // },
  // offered_designation:{
  //     type:String,
  //     maxLength:50,
  // },
  // offered_band:{
  //     type:String,
  //     maxLength:20,
  // },
  // offered_salary:{
  //     type:String,
  //     maxLength:15,
  // },
  date_of_joining: {
    type: Date,
  },
  created_by: {
    type: String,
    maxLength: 50,
  },
  created_on: {
    type: Date,
  },
  updated_by: {
    type: String,
    maxLength: 50,
  },
  updated_on: {
    type: Date,
  },
  is_deleted: {
    type: Boolean,
  },
  deleted_by: {
    type: String,
    maxLength: 50,
  },
  deleted_on: {
    type: Date,
  },
  role: {
    type: String,
  },
});
const counterSchema = {
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
};
const countermodel = mongoose.model(
  "counter",
  counterSchema,
);
const addCandid = mongoose.model("candidates", candidates);

module.exports = { countermodel, addCandid };
