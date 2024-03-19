const express = require('express');
const {updatePanel} = require('../../controllers/updatePanel/updatePanel');

const router = express.Router();

router.post('/', updatePanel);

module.exports = router;