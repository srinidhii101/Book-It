const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User session model definition
const UsersSessions = new Schema({
    userId: { type: String, default: -1 },
      timestamp: { type: Date, default: Date.now() },
      isDeleted: {type: Boolean, default: false },
      
});
  
    
  
  // export the new Schema so we could modify it using Node.js
  module.exports = mongoose.model("UsersSessions", UsersSessions);
  
  