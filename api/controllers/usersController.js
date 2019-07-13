const Users = require('../models/usersSchema');
const Services = require('../models/servicesSchema');

class UsersModel {
  //get all users
  getUsers(req, res) {
    Users.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }

  //get a user by id
  getUser(req, res) {
    Users.find({'_id': req.params._id},(err, data)=> {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }

  //get user services by user id
  getUserServices(req, res) {
    Users.findOne({'_id': req.params._id},(err, data)=> {
      if (err) return res.json({ success: false, error: err });
      Services.find({ '_id': data.services.map(x => x.id)}, (error, response)=> {
        if (error) return res.json({ success: false, error: error });
        return res.json({ success: true, data: response });
      });
    });
  }

  //create a new user
  createUser(req, res) {
    let user = new Users();
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    user.services = req.body.services;
    user.info = req.body.info;
    user.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  }

  
  //update a user's role
  updateUserRole(req, res) {
    Users.findOneAndUpdate({'email': req.body.email}, {'role': req.body.newRole}, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
  });
  }
}
module.exports = new UsersModel();
