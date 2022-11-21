const express = require('express');
const getAttendanceCount = require('./routes/attendanceBotRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
//Route Import

app.use('/api/v1', getAttendanceCount);

module.exports = app; 