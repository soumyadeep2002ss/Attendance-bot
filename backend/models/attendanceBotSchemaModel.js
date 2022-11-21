const mongoose = require('mongoose');

const AttendanceBotSchema = new mongoose.Schema({
    attendance: {
        type: Number,
        required: true
    },
}
);

module.exports = mongoose.model('AtendanceCount', AttendanceBotSchema);