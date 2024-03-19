const express = require('express');
const logout = require('../../controllers/logout/logoutController');

const router = express.Router();

router.put('/', logout);

module.exports = router;