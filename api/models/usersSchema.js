const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UsersSchema = new Schema({
  username: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true },
    
    role: {
        type: String,
        required: true,
        enum : ['customer','vendor','admin'],
        default: 'customer'
    },
    services: Array,
    bookings: Array,
    info: Object
  }, { 'timestamps': true });

  

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Users", UsersSchema);

