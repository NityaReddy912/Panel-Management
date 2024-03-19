const mongoose=require('mongoose');


const userSchema=mongoose.Schema({

    User_ID:{

        type:String,

        required:true

    },

    User_Name:{

        type:String,

        required:true

    },

    Email:{

        type:String,

        required:true

    },

    Roles:{

        type:String,

        required:true

    },

    Action:{

        type:Boolean,

        required:true

    },

    Password:{

        type:String,

        required:true

    }

})

module.exports=mongoose.model('user',userSchema);