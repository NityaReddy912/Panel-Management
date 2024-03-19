// relationship

// {
//   skill_group_id: {
//     ref: #/relationship/mongodb-atlas/Panel_Management/skill_groups,
//     foreignKey: skill_group_id,
//     isList: false
//   }
// }

// ----------

// schema

const mongoose=require('mongoose');

const skillsSchema=mongoose.Schema({
  // _id: {
  //   type: objectId
  // },

  created_by: {
    type: String
  },
  created_on: {
    type: Date
  },
  deleted_by: {
    type: String
  },
  deleted_on: {
    type: Date
  },
  is_deleted: {
    type: Boolean
  },
  skill_group_id: {
    type: String
  },
  skill_id: {
    type: Number
  },
  skill_name: {
    type: String
  },
  upDated_by: {
    type: String
  },
  upDated_on: {
    type: Date
  }
})


module.exports=mongoose.model('skill',skillsSchema);