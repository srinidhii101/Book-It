const Services = require('../models/servicesSchema');
const Users = require('../models/usersSchema');

class ServicesModel {
  //retrieving a list of all services
  getServices(req, res) {
    Services.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }

  createService(req, res) {
    //creating instance and setting variables for the new service
    let service = new Services();
    service.lastBooked = req.body.lastBooked;
    service.numberOfBookings = req.body.numberOfBookings;
    service.name = req.body.name;
    service.description = req.body.description;
    service.price = req.body.price;
    service.cloud_name = req.body.cloud_name;
    service.cloud_url = req.body.cloud_url;

    //saving the service
    service.save((err, service) => {
      if (err) return res.json({ success: false, error: err });
      //updating related user to hold the service id for later reference
      Users.findById({ "_id": req.body.user},(err, user)=> {
        if (err) return res.json({ success: false, error: err });
        user.services.push({"id": service._id});
        user.save();
        return res.json({ success: true });
      });
    });
  }
}
module.exports = new ServicesModel();
