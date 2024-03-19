const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    grade_id:{
        type : String,
        maxlength: 20,
        unique:true,
        required :true
    },
    grade:{
        type : String,
        maxlength: 20,
        unique:true,
        required :true
    },
    created_by:{
        type: String,
        maxlength: 50,
        required:true
    },
    created_on:{
        type:Date,
        required:true
    },
    updated_by:{
        type: String,
        maxlength: 50,
        required:true
    },
    updated_on:{
        type: Date,
        required:true
    },
    is_deleted:{
        type: Boolean,
        required:true
    },
    deleted_by:{
        type: String,
        maxlength: 50,
        required:true
    },
    deleted_on:{
        type: Date,
        required:true
    }
})

module.exports= mongoose.model('grade',gradeSchema)