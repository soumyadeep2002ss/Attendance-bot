const AttendanceCount = require('../models/attendanceBotSchemaModel');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAttendanceCount = catchAsyncErrors(async (req, res, next) => {
    const attendanceCount = await AttendanceCount.find().sort({ attendance: 1 });
    // console.log(attendanceCount);
    res.status(200).json({
        success: true,
        attendanceCount,
    });
});

exports.createAttendanceCount = catchAsyncErrors(async (req, res, next) => {

    try {
        const attlist = await AttendanceCount.find();
        if (attlist.length > 0) {
            await AttendanceCount.findOneAndUpdate({ _id: attlist[0]._id }, {
                attendance: req.body.attendance
            })
        }
        else {
            let newAtt = new AttendanceCount({ attendance: req.body.attendance });
            await newAtt.save();
        }
        res.status(200).json({ message: "Attendance updated!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" });
    }


    // const attendance = req.body;
    // const attendanceCount = await AttendanceCount.findOne(attendance);
    // //update
    // if (attendanceCount) {
    //     attendanceCount.attendance = attendance;
    //     await attendanceCount.save();
    //     return res.status(200).json({
    //         success: true,
    //         attendanceCount,
    //     });
    // }
    // else {
    //     const newAttendanceCount = await AttendanceCount.create(attendance);
    //     res.status(201).json({
    //         success: true,
    //         newAttendanceCount,
    //     });
    // }

});
