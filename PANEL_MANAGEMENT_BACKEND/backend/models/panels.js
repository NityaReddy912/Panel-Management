const mongoose=require('mongoose');

const panelSchema=mongoose.Schema({
  id:{ 
    type: String
  },

  user_id:{ 
    type: String
  },

  contact:{ 
    type: String
  },

  grade:{ 
    type: String
  },

  panel_level:{ 
    type: String
  },

  remarks:{ 
    type: String
  },

  is_active:{ 
    type: Boolean
  },

  candiddate_role_id:{ 
    type: String
  },

  type_id:{ 
    type: String
  },


  created_by:{ 
    type: String
  },

  created_on:{ 
    type: Date
  },

  deleted_by:{ 
    type: String
  },

  deleted_on:{ 
    type: Date
  },

  is_deleted:{ 
    type: Boolean
  },

  updated_by:{ 
    type: String
  },

  updated_on:{ 
    type: Date
  }

  
})

module.exports=mongoose.model('panels',panelSchema);