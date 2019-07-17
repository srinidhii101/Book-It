const Users = require('../models/usersSchema');
const Services = require('../models/servicesSchema');
const CryptoJS = require("crypto-js")
const UserSessions = require('../models/userSessions');
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
    user.services =  [];
    user.info = req.body.info;
    
    //retrieving and checking if email already exist in DB
    Users.find({'email':user.email}, (err, existingUsers) =>
    
      {
        if (err){
        return res.json({success: false, error: err});
      }    

      if (existingUsers.length > 0) {
       return res.json ({exist : "Email already registered"}); 
       
      } 
      //saving a new user after validation has been successfully performed
     user.save((err) => {
        if (err)
         { 
           return res.json({ success: false, error: err });
         }
        return res.json({ success: true, message: "Account created" }); 
       
      }

    ); 
    });
  

  }



    //user login

  userLogin(req, res) {
    let user = new Users();
    user.username = req.body.username;
    user.password = req.body.password;

    //decrypting incoming password from the user
    var passdecryptIncoming  = (CryptoJS.AES.decrypt(user.password.toString(), 'quick Oats')).toString(CryptoJS.enc.Utf8); //decrypt incoming password
    
    //checking if a user exist for the username provided by the user
    Users.find({'username':user.username}, (err, users) => {
      if(err) {
        return res.send ({success: false, message: "could not connect to server"});
      }
    
      //non-existing account
      if (users.length !== 1) {
        return res.send ({ success: false, message: "Email ID does not exists"});
      }

      //decrypting the stored password for the user and checking against the one supplied for login
    const userdb = users[0]; 
    var passdecrypt  = (CryptoJS.AES.decrypt(userdb.password.toString(), 'quick Oats')).toString(CryptoJS.enc.Utf8); //decrypt stored password  
      if (passdecrypt !== passdecryptIncoming) {

        return res.send ({ success: false, message: "Password is incorrect"});
      }

      const userSession = new UserSessions();
      userSession.userId = user._id;
      userSession.save((err, secRecord) => { if (err) {
         return res.send({success: false, message: "Error, could not save session"} ); 
        }
        console.log(secRecord._id);

        return res.send ({ success: true, message: "Login successful"});
       

    })

     

    });



    //successful authentication
   /* const userSession = new UserSession();
    userSession.userID = user._id;
    userSession.save((err, doc) => {
      if (err) {
        return res.send ({ success: false, message: "Could connect database"});
      }

      return res.send ({ success: "signed in successfully", token: doc._id});
    }); */

  }

} 
module.exports = new UsersModel();
