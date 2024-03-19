const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  
  user_id:{ 
    type: String
  },

  name:{ 
    type: String
  },

  email:{ 
    type: String
  },

  is_active:{ 
    type: Boolean
  },

  password:{ 
    type: String
  },

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

    

    

    is_deleted:{ 
      type: Boolean
    },
    
    

    

    updated_by:{ 
      type: String
    },

    updated_on:{ 
      type:Date
    },

    // Token:{ 
    //   type:String
    // },

    
  
})
// // const userSchema=mongoose.Schema({

// //     User_ID:{

// //         type:String,

// //         required:true

// //     },

// //     User_Name:{

// //         type:String,

// //         required:true

// //     },

// //     Email:{

// //         type:String,

// //         required:true

// //     },

// //     Roles:{

// //         type:String,

// //         required:true

// //     },

// //     Action:{

// //         type:Boolean,

// //         required:true

// //     },

// //     Password:{

// //         type:String,

// //         required:true

// //     },
// //     isFirstTimeActive:{
// //         type: Boolean
// //     }

// // })

module.exports=mongoose.model('user',userSchema);



// relationship

// {
//   user_id: {
//     ref: #/relationship/mongodb-atlas/Panel_Management/panels,
//     foreignKey: user_id,
//     isList: false
//   }
// }

// ---------
// schema


// const mongoose=require('mongoose');


// const userSchema=mongoose.Schema({
  
//     // _id: {
//     //   type: objectId
//     // },
//     created_by: {
//       type: String
//     },
//     created_on: {
//       type: Date
//     },
//     deleted_by: {
//       type: String
//     },
//     deleted_on: {
//       type: Date
//     },
//     email: {
//       type: String
//     },
//     is_active: {
//       type: Boolean
//     },
//     is_deleted: {
//       type: Boolean
//     },
//     name: {
//       type: String
//     },
//     password: {
//       type: String
//     },
//     upDated_by: {
//       type: String
//     },
//     upDated_on: {
//       type: Date
//     },
//     user_id: {
//       type: String
//     }
  
// })


// // {
// //   title: user,
// //   properties: 
// // }


// module.exports=mongoose.model('user',userSchema);