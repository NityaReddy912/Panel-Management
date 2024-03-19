const express = require('express');
const resetpassword = require('../../controllers/reset_password/resetPasswordController');

const router = express.Router();

router.put('/', resetpassword);

module.exports = router;