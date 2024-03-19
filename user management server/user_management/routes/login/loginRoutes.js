const express = require('express');
const {login} = require('../../controllers/login/loginController');

const router = express.Router();

router.post('/', login);

module.exports = router;