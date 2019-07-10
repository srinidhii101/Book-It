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
    user.username=req.body.username;
    user.password = req.body.password;
    user.role = req.body.role;
    user.services = req.body.services;
    user.info = req.body.info;
    user.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  }
}


//user login
/*
userLogin(req, res) {
  let user = new Users();
  email = req.body.email;
  password = req.body.password;
  Users.find({email:email}, (err, users) => 
  { if(err)
      return res.send ({success: false, message: "could not connect to server"});

  
  //non-existing account
  if (users.length != 1) {
    return res.send ({ success: false, message: "Email ID does not exists"});

  }
//incorrect password check
  const user = users[0]; 
  if (!user.validPassword (password)) {
    return res.send ({ success: false, message: "Password is incorrect"});
  }

});

  //successful authentication
  new userSession = new UserSession();
  userSession.userID = user._id;
  userSession.save((err, doc) => {
    if (err) {
      return res.send ({ success: false, message: "Could connect database"});
    }

    return res.send ({ success: "signed in successfully", token: doc._id});
  });

};  */
module.exports = new UsersModel();
