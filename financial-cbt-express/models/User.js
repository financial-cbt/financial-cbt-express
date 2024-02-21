const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : String,
    pw : String,
    nickname : String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
