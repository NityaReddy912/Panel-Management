const express =require('express');
const {panelavailability,changeActiveStatus, getrolesdrop, getinttypedrop, getavailstatdrop}= require('../../controllers/PanelAvailibility/PanelAvailability');

const router = express.Router();

router.get('/',panelavailability);
router.put('/:id', changeActiveStatus)
router.get('/getrolesdrop', getrolesdrop)
router.get('/getinttypedrop', getinttypedrop)
router.get('/getavailstatdrop', getavailstatdrop)

module.exports=router;