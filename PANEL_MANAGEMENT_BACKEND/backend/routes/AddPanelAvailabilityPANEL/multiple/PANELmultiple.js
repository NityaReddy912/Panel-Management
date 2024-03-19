let express = require('express');
let router = express.Router();

const {addPanelAvailability, panelNames,getsingle} = require('../../../controllers/AddPanelAvailabilityPH/multiple/PHmultiple');


// router.get('/getAll',panelAvailabilityController.getAll);
//router.post('/addPanelAvailability',panelMultiple);
router.get('/panelNames',panelNames);
router.post('/addPanelAvailability',addPanelAvailability);
router.post('/',getsingle);

// router.put('/updateUser/:ID',userController.updateUser);

// router.get('/getAllUsers',userController.getAllUsers);
// router.get('/getbyid/:id',userController.getByID);


module.exports = router;