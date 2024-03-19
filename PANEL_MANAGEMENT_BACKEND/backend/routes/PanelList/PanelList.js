const express =require('express');
const {panelList, changeActiveStatus} = require('../../controllers/PanelList/PanelList');

const router = express.Router();

router.post('/',panelList);
router.put('/updateActive/:id',changeActiveStatus);

module.exports=router;