

const mongoose=require('mongoose');

const candidaterolesSchema=mongoose.Schema({

  
  candidate_role_id:{ 
    type: String
  },

  candidate_roles:{ 
    type: String
  }


})

module.exports=mongoose.model('candidate_role',candidaterolesSchema);