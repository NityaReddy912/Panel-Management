let express = require('express');
let router = express.Router();

const userController = require('../../controllers/user_controller/userController');
router.post('/search/:page', userController.search);
router.post('/addUser',userController.addUser);

router.put('/updateUser/:ID',userController.updateUser);
router.put('/updateIsActive/:ID',userController.updateIsActive);

router.get('/getAllUsers',userController.getAllUsers);
router.get('/getbyid/:id',userController.getByID);


module.exports = router;