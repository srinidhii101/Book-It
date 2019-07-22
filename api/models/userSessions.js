const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User session model definition
const UsersSessions = new Schema({
  userId: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { 'timestamps': true });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("UsersSessions", UsersSessions);
