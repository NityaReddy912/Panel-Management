let express = require('express');
let router = express.Router();

const userController = require('../../controllers/user_controller/userController');
router.post('/search', userController.search);
router.post('/addUser',userController.addUser);

router.put('/updateUser/:ID',userController.updateUser);

router.get('/getAllUsers',userController.getAllUsers);
router.get('/getbyid/:id',userController.getByID);


module.exports = router;