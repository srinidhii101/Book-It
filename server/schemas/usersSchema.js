// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UsersSchema = new Schema({
    id: Number,
    created: Date,
    updated: Date,
    email: String,
    password: String,
    role: {
        type: String,
        enum : ['customer','vendor','admin'],
        default: 'customer'
    },
    info: Object
  }, { collection : 'users' }, { timestamps: true });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Users", UsersSchema);
