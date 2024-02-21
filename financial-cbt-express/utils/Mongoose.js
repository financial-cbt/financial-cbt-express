const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
console.log("MONGO_URL: " + MONGO_URL);
mongoose
    .connect(
        MONGO_URL, {
        useUnifiedTopology: true, useNewUrlParser: true
    }
    )
    .then(() => console.log("Connected Successful"))
    .catch(err => console.log(err));

module.exports = mongoose;