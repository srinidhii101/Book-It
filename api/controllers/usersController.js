const Users = require('../models/usersSchema');
const Services = require('../models/servicesSchema');

//Reference: https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
const ObjectID = require('mongodb').ObjectID;

const receipt = require('receipt');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require("fs");

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
    user.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  }

  // Method to update the payment details of a user
  // Reference: https://mongoosejs.com/docs/api.html
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
          totalAmount: 200 // this amount will be changed when add to cart feture is implemented
        }
      }
    }, {
      upsert: true
    });


    // Start code for receipt generation
    // Reference: https://www.npmjs.com/package/receipt
    // The below code has been modfied to create the receipt as per the customer orders
    receipt.config.width = 40;
    receipt.config.ruler = '-';
    var date = new Date();
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
          value: date
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
            value: "220$"
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
    fs.writeFile("receipt.txt", receiptOutput, (err) => {
      if (err) console.log(receiptOutput);
      console.log("Successfully Written to File.");
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
        html: " Hi,<br><br> PFA the order receipt.<br><br>Regards,<br>Team Book it",
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
}

module.exports = new UsersModel();
