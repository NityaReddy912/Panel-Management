const mongoose = require('mongoose');

const interview_statusSchema = mongoose.Schema({
    interview_status_id:{
        type:String,
        unique:true,
        maxLength: 20,
    },
    interview_status:{
        type:String,
        maxLength: 80,
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

module.exports = mongoose.model("interview_status", interview_statusSchema);