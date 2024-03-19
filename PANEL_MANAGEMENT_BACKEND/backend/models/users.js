

const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
  
  
    // _id:{ 
    //   type: objectId
    // },

    created_by:{ 
      type: String
    },

    created_on:{ 
      type:Date
    },

    deleted_by:{ 
      type: String
    },

    deleted_on:{ 
      type:Date
    },

    email:{ 
      type: String
    },

    is_active:{ 
      type: Boolean
    },

    is_deleted:{ 
      type: Boolean
    },
    
    name:{ 
      type: String
    },

    password:{ 
      type: String
    },

    updated_by:{ 
      type: String
    },

    updated_on:{ 
      type:Date
    },

    user_id:{ 
      type: String
  }
  
})

module.exports=mongoose.model('user',userSchema);

