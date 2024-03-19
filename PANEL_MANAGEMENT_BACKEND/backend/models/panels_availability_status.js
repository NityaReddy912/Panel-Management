const mongoose = require('mongoose');



const panelAvailStatusSchema = mongoose.Schema({

   

      availability_status: {

        type: String

      },

      availability_status_id: {

        type: String,

        unique:true,

      },

      created_by: {

        type: String

      },

      created_on: {

        type: mongoose.SchemaTypes.Date,

      },

      deleted_by: {

        type: String

      },

      deleted_on: {

        type: mongoose.SchemaTypes.Date,

      },

      is_deleted: {

        type: Boolean,

      },

      updated_by: {

        type: String

      },

      updated_on: {

        type: mongoose.SchemaTypes.Date,

      }

})



module.exports = mongoose.model('panels_availability_status', panelAvailStatusSchema, 'panels_availability_statuses')