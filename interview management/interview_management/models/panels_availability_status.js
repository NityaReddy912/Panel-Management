const mongoose = require('mongoose');

const panels_availability_statusSchema = mongoose.Schema({
    availability_status_id:{
        type:String,
        unique:true,
        maxLength: 20,
    },
    availability_status:{
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

module.exports = mongoose.model("panels_availability_statusSchema", panels_availability_statusSchema);