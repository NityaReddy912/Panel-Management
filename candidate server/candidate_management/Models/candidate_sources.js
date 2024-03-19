const mongoose = require('mongoose');

const candidate_scourceSchema = mongoose.Schema({
    source_id:{
        type : mongoose.Schema.Types.ObjectId,
        maxLength : 20,
    },
    source:{
        type:String,
        maxLength:80,
    },
    created_by:{
        type:String,
        maxLength:50,
    },
    created_on:{
        type: Date,
    },
    updated_by:{
        type:String,
        maxLength:50,
    },
    updated_on:{
        type:Date,
    },
    is_deleted:{
        type:Boolean,
    },
    deleted_by:{
        type:String,
        maxLength:50,
    },
    deleted_on:{
        type:Date,
    },
})

module.exports = mongoose.model('candidate_scource',candidate_scourceSchema);

