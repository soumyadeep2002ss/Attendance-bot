const app = require('./app');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connect = require('./config/database');
const connectDatabase = require('./config/database');


dotenv.config({ path: 'config.env' });
connectDatabase();

// const dt = new Date();
// console.log(dt);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
    });
}


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});