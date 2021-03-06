const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
})

module.exports = mongoose.model('User', userSchema);