const mongoose = require('mongoose');

const interview_typesSchema = mongoose.Schema({
    type_id:{
        type:String,
        unique:true,
        maxLength: 20,
    },
    type:{
        type:String,
        maxLength: 20,
    },
    created_by:{
        type:String,
        maxLength: 50, 
    },
    created_on:{
        type: Date,
    },
    updated_by:{
        type:String,
        maxLength: 50,
        default: "",
    },
    updated_on:{
        type: Date,
        default: "",
    },
    is_deleted:{
        type:Boolean,
    },
    deleted_by:{
        type:String,
        maxLength: 50,
        default: "",
    },
    deleted_on:{
        type: Date,
        default: "",
    }
});

module.exports = mongoose.model("interview_types", interview_typesSchema);