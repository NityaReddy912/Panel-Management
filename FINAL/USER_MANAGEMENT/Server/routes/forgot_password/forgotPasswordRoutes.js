const express = require('express');
const forgotPassword = require('../../controllers/forgot_password/forgotPasswordController');

const router = express.Router();

router.post('/', forgotPassword);

module.exports = router;