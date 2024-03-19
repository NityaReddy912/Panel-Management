const express = require('express');

const{
    addInterview,
    getAllScheduledinterviews,
    Search,
} = require('../controllers/listInterview');

const router = express.Router();


router.post("/addInterview", addInterview);
router.post("/getallinterviews", getAllScheduledinterviews);
router.post("/searchinterviews", Search);



module.exports = router;