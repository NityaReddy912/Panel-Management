const express =require('express');
const { postsingle, panelNames, getsingle } = require('../../../controllers/AddPanelAvailabilityPANEL/single/PANELsingle');

const router = express.Router();

router.post('/',getsingle);
router.post('/post', postsingle); 
router.get('/panelNames', panelNames);

module.exports=router;