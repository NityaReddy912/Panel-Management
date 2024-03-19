const mongoose = require('mongoose');

const panelSchema = mongoose.Schema({
    id:{
        type : Number,
        
    },
    user_id:{
        type : String,
        
    },
    contact:{
        type: String,
        
    },
    grade:{
        type:String,
        
    },
    panel_level:{
        type: String,
        
    },
    remarks:{
        type: String
    },
    is_active:{
        type: Boolean,
        
    },
    type_id:{
        type: String,
        default: "TP1"
    },
    created_by:{
        type: String,
        
    },
    created_on:{
        type: mongoose.SchemaTypes.Date,
        
    },
    updated_by:{
        type: String,
        
    },
    updated_on:{
        type: mongoose.SchemaTypes.Date,
        
    },
    is_deleted:{
        type: Boolean,
    },
    deleted_by:{
        type: String,
    },
    deleted_on:{
        type: mongoose.SchemaTypes.Date,
    }
})

module.exports = mongoose.model('panel', panelSchema);