const mongoose = require('mongoose');

const panelSchema = mongoose.Schema({
    panel_level_id:{
        type :String,
        maxlength:20,
        required : true
    },
    panel_level:{
        type : String,
        maxlength:100,
        required : true
    },
    created_by:{
        type: String,
        maxlength:50,
        required: true
    },
    created_on:{
        type: Date,
        required: true
    },
    updated_by:{
        type: String,
        maxlength:50,
        required: true
    },
    updated_on:{
        type: Date,
        required: true
    },
    is_deleted:{
        type: Boolean,
        required: true
    },
    deleted_by:{
        type: String,
        maxlength:50,
        required: true
    },
    deleted_on:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('panel_level', panelSchema);