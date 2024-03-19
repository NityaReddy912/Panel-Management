const mongoose = require('mongoose');


const interviewtypeSchema=mongoose.Schema({
    

    type: {
      type: String
    },
    type_id: {
      type: String
    },
    created_by: {
      type: String
    },
    created_on: {
      type: Date
    },
    deleted_by: {
      type: String
    },
    deleted_on: {
      type: Date
    },
    is_deleted: {
      type: Boolean
    },
    
    updated_by: {
      type: String
    },
    updated_on: {
      type: Date
    }
  })


  module.exports=mongoose.model('interview_type',interviewtypeSchema);
// const gradeSchema = mongoose.Schema({
//     "created_by": {
//         type : String
//       },
//       "created_on": {
//         type : mongoose.SchemaTypes.Date
//       },
//       "deleted_by": {
//         type : String
//       },
//       "deleted_on": {
//         type : mongoose.SchemaTypes.Date
//       },
//       "is_deleted": {
//         type : Boolean
//       },
//       "type": {
//         type : String
//       },
//       "type_id": {
//         type : String
//       },
//       "updated_by": {
//         type : String
//       },
//       "updated_on": {
//         type : mongoose.SchemaTypes.Date
//       }
// })

// module.exports= mongoose.model('interview_type',gradeSchema)