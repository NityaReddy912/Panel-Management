const mongoose=require('mongoose');

const panelSkillSchema=mongoose.Schema({
  
  // _id:{ 
  //   type: objectId
  // },

  created_by:{ 
    type: String,
    default: ""
  },

  created_on:{ 
    type:Date,
    default: new Date()
  },

  deleted_by:{ 
    type: String,
    default: ""
  },

  deleted_on:{ 
    type:Date,
    default: new Date("1970-01-01")
  },

  duration_id:{ 
    type: String,
    default: ""
  },

  id:{ 
    type: Number,
    default: Math.ceil(Math.random()*100000000)
  },

  is_active: {
    type: Boolean,
    default: true
  },

  is_deleted:{ 
    type: Boolean,
    default: false
  },

  panel_id:{ 
    type: Number
  },

  skill_id:{ 
    type: Number
  },

  type_id:{ 
    type: String
  },

  updated_by:{ 
    type: String,
    default: ""
  },

  updated_on:{ 
    type:Date,
    default: new Date()
  }
})

module.exports=mongoose.model('panels_skills',panelSkillSchema);