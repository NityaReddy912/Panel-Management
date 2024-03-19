const mongoose = require('mongoose');

const panels_availabilitiesSchema= mongoose.Schema({

  availability_status_id: {
    type: String
  },
  week_days:{
    type: String
  },
  available_date: {
    type: mongoose.SchemaTypes.Date
  },
  created_by: {
    type: String
  },
  created_on: {
    type: mongoose.SchemaTypes.Date
  },
  deleted_by: {
    type: String
  },
  deleted_on: {
    type: mongoose.SchemaTypes.Date
  },
  end_time: {
    type: String
  },
  is_deleted: {
    type: Boolean
  },
  panel_availability_id: {
    type: Number
  },
  panel_id: {
    type: Number
  },
  start_time: {
    type: String
  },
  updated_by: {
    type: String
  },
  updated_on: {
    type: mongoose.SchemaTypes.Date
  },
  is_active:{
    type:Boolean,
    default:true
  }

})

  module.exports=mongoose.model('panels_availability',panels_availabilitiesSchema);