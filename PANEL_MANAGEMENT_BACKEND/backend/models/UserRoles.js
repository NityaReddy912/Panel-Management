const mongoose = require('mongoose');

const panelSchema = mongoose.Schema({
    created_by: {
        type: String
    },
    created_on: {
        type: mongoose.SchemaTypes.Date
    },
    deleted_by: {
        type: String
    },
    deleted_on: {
        type: mongoose.SchemaTypes.Date
    },
    id: {
        type: Number
    },
    is_active: {
        type: Boolean
    },
    is_deleted: {
        type: Boolean
    },
    role_id: {
        type: String
    },
    updated_by: {
        type: String
    },
    updated_on: {
        type: mongoose.SchemaTypes.Date
    },
    user_id: {
        type: String
    }
})

module.exports = mongoose.model('user_role', panelSchema);