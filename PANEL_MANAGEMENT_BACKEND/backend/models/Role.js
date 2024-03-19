const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    "created_by": {
        type : String
      },
      "created_on": {
        type : mongoose.SchemaTypes.Date
      },
      "deleted_by": {
        type : String
      },
      "deleted_on": {
        type : mongoose.SchemaTypes.Date
      },
      "is_deleted": {
        type : Boolean
      },
      "role_id": {
        type : String
      },
      "role_name": {
        type : String
      },
      "updated_by": {
        type : String
      },
      "updated_on": {
        type : mongoose.SchemaTypes.Date
      }
})

module.exports= mongoose.model('role',gradeSchema)