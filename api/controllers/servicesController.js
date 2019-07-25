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

  getServicesList(req, res) {
    Services.find({'_id': { $in: req.params.list.split(',') }}, (err, data)=>{
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data});
    });
  }

  getServiceStats(req, res) {
    Promise.all([
      Services.find().sort({ createdAt: -1 }).select('name').limit(3),
      Services.find().sort('-lastBooked').select('name').limit(3),
      Services.find().sort('-numberOfBookings').select('name').limit(3)
    ]).then((result, err) => {
      if(err) return res.json({ success: false, error: err });
      res.json({'recent': result[0],'last': result[1], 'popular': result[2]});
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
      Users.findById({ "_id": req.body.user},(error, user)=> {
        if (error) return res.json({ success: false, error: error });
        user.services.push({"id": service._id});
        user.save();
        return res.json({ success: true, service: service });
      });
    });
  }

  deleteService(req, res) {
    Services.findByIdAndRemove(req.params.id, (err, response) => {
      if (err) return response.send(err);
      Users.findById({ "_id": req.params.user},(error, user)=> {
        if (error) return response.send(error);
        user.services = user.services.filter(service => JSON.stringify(service.id) !== JSON.stringify(req.params.id));
        user.save();
      });
    });
    return res.json({ success: true });
  }

  updateService(req, res) {
    Services.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  }
}
module.exports = new ServicesModel();
