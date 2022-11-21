const express = require('express');
const { getAttendanceCount,createAttendanceCount } = require('../controllers/attendanceBotController');

const router = express.Router();

router.route("/attendanceCount").get(getAttendanceCount);
router.route("/attendanceCount/new").post(createAttendanceCount);

module.exports = router;