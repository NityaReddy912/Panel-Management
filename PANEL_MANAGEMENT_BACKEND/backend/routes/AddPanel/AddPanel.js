const express =require('express');
const {addpanel,getrolesandtype,getUser}= require('../../controllers/AddPanel/AddPanel');



//const getrolesandtype=require("../../controllers/AddPanel/AddPanel")
const router = express.Router();

router.post('/',addpanel);
router.get("/",getrolesandtype);
router.get("/:id",getUser)
module.exports=router;