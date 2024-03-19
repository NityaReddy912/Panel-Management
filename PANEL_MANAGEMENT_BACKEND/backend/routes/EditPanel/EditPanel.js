const express =require('express');
const {editpanel, getpanel}= require('../../controllers/EditPanel/EditPanel');

const router = express.Router();


router.post('/',getpanel);
router.put('/',editpanel);

module.exports=router;