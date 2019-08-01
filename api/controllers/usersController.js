const Users = require('../models/usersSchema');
const Services = require('../models/servicesSchema');

const ObjectID = require('mongodb').ObjectID;
const receipt = require('receipt');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fileStream = require("fs");
const dateFormatter = require('dateformat');
const CryptoJS = require("crypto-js");
// const UserSessions = require('../models/userSessions');

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

  //get a user by id
  getUserBookings(req, res) {
    Users.findOne({'_id': req.params._id},(err, data)=> {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data.bookings });
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
      user.save((err, data) => {
        if (err) {
           return res.json({ success: false, error: err });
        }
        return res.json({ success: true, message: "Account created", data: data });
      });
    });
  }

  //update user
  updateUser(req, res) {
    Users.findByIdAndUpdate(req.params._id, req.body, (err) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true});
    })
  }

  // Method to update the payment details of a user
  updateUserPaymentDetails(request, response, db) {
    var usersCollection = db.collection('users');
    usersCollection.updateOne({
      _id: new ObjectID(request.params.id)
    }, {
      $set: {
        info: {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          companyName: request.body.companyName,
          country: "Canada",
          province: request.body.province,
          city: request.body.city,
          street: request.body.street,
          postalCode: request.body.postalCode,
          phone: request.body.phone,
          email: request.body.email,
          additionalInfo: request.body.additionalInfo,
          totalAmount: request.body.total
        },
        bookings: request.body.bookings
      }
    }, {
      upsert: true
    });

    // console.log(request.body);
    // Users.update({_id: new ObjectID(request.params.id)}, {
    //   $set: {
    //     "info": {
    //       "firstName": request.body.firstName,
    //       "lastName": request.body.lastName,
    //       "companyName": request.body.companyName,
    //       "country": "Canada",
    //       "province": request.body.province,
    //       "city": request.body.city,
    //       "street": request.body.street,
    //       "postalCode": request.body.postalCode,
    //       "phone": request.body.phone,
    //       "email": request.body.email,
    //       "additionalInfo": request.body.additionalInfo,
    //       "totalAmount": request.body.total,
    //     },
    //     "bookings": request.body.bookings
    //   }
    // }, {
    //   upsert: true
    // });

    //update all lastBooked and numberOfBookings ******************

    // Start code for receipt generation
    // Reference: https://www.npmjs.com/package/receipt
    // The below code has been modfied to create the receipt as per the customer orders
    receipt.config.width = 40;
    receipt.config.ruler = '-';
    var date = new Date();
    var formattedDate = dateFormatter(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    var customerName = request.body.firstName + ' ' + request.body.lastName;

    var receiptOutput = receipt.create([{
        type: 'text',
        value: [
          'Book It',
          'Thanks for supporting Local!',
        ],
        align: 'center'
      },
      {
        type: 'empty'
      },
      {
        type: 'properties',
        lines: [{
          name: 'Date',
          value: formattedDate
        }]
      },
      {
        type: 'empty'
      },
      {
        type: 'properties',
        lines: [{
            name: 'Customer Name',
            value: customerName
          },
          {
            name: 'Email',
            value: request.body.email
          },
          {
            name: 'Phone',
            value: request.body.phone
          },
          {
            name: 'Amount Received',
            value: request.body.total
          },
        ]
      },
      {
        type: 'empty'
      },
      {
        type: 'text',
        value: 'For more information about your orders log in to the website!',
        align: 'center',
        padding: 5
      }
    ]);
    // End code for receipt generation

    // Start code for saving the receipt to a text file
    // Reference: https://tutorialedge.net/nodejs/reading-writing-files-with-nodejs/
    // Tutorial used to know how to write to file in Node.js
    fileStream.writeFile("receipt.txt", receiptOutput, (err) => {
      if (err) console.log(receiptOutput);
      // console.log("Successfully Written to File.");
    });
    // End code for saving the receipt to a text file


    // Start code for emailing the order receipt to the customer
    // Reference: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
    // Modified the code to send attachment as an email
    async function emailReceipt() {
      const oauth2Client = new OAuth2(
        "736822544263-f5unplnuatusndkdl5fdj19o9ft607k1.apps.googleusercontent.com",
        "fPBYr3m9pEGnKJLwYecXe1nD",
        "https://developers.google.com/oauthplayground"
      );
      oauth2Client.setCredentials({
        refresh_token: "1/WRN1OTKsjmREXGsXO49APfEN3MEt8dbYRPiTfu-CsCg"
      });
      const tokens = await oauth2Client.refreshAccessToken()
      const accessToken = tokens.credentials.access_token

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: 'OAuth2',
          user: 'singh.manpreet4664@gmail.com',
          clientId: "736822544263-f5unplnuatusndkdl5fdj19o9ft607k1.apps.googleusercontent.com",
          clientSecret: "fPBYr3m9pEGnKJLwYecXe1nD",
          refreshToken: "1/WRN1OTKsjmREXGsXO49APfEN3MEt8dbYRPiTfu-CsCg",
          accessToken: accessToken
        }
      });

      await transporter.sendMail({
        from: 'singh.manpreet4664@gmail.com',
        to: request.body.email,
        subject: "Your Order Receipt",
        text: receiptOutput,
        html: " Hi,<br><br> Here is a receipt for your recent purchase.<br><br>Regards,<br>Team Book it<br>",
        attachments: [{
          filename: 'receipt.txt',
          path: 'receipt.txt',
          cid: 'uniq-receipt.txt'
        }]
      });
    }
    emailReceipt().catch(console.error);
    // End code for emailing the order receipt to the customer
  }

  //user login
  //followed video tutorial from https://www.youtube.com/watch?time_continue=180&v=s1swJLYxLAA
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
      if (passdecrypt === passdecryptIncoming) {
        return res.send({ success: true, userId: userdb._id, role: userdb.role });
      } else {
        return res.send({ success: false, message: "Invalid credentials."})
      }

      //create session for user if authentication is successful
      // const userSession = new UserSessions();
      // userSession.userId = user._id;
      // userSession.save((err, secRecord) => {
      //   console.log(secRecord);
      //   if (err) {
      //    return res.send({ success: false, message: "Error, could not save session" });
      //   }
      //   return res.send ({ success: true, message: "Login successful"});
      // });
    });
  }
}
module.exports = new UsersModel();
