const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ServicesSchema = new Schema({
    lastBooked: Date,
    numberOfBookings: Number,
    name: String,
    description: String,
    price: Number,
    cloud_name: String,
    cloud_url: String,
    reviews: Array
  }, { 'timestamps': true });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Services", ServicesSchema);
