const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const UsersController = require('./api/controllers/usersController');
const ServiceController = require('./api/controllers/servicesController');

// const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = process.env.DB_ROUTE;
//'mongodb+srv://kirby:Bookit@123@bookit-cluster-jltje.mongodb.net/bookit?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//fetch all users
router.get('/users', (req, res) => {
  return UsersController.getUsers(req, res);
});

//fetch user
router.get('/users/:_id', (req, res) => {
  if(typeof req.params.id === String) {
    req.params.id = mongoose.Types.ObjectId(req.params.id);
  }
  return UsersController.getUser(req, res);
})

//fetch user services
router.get('/users/:_id/services', (req, res) => {
  return UsersController.getUserServices(req, res);
});

//fetch all users
router.get('/services', (req, res) => {
  return ServiceController.getServices(req, res);
});

// this is our create methid
// this method adds new data in our database
router.post('/users', (req, res) => {
  return UsersController.createUser(req, res);
});

// this method adds new service in our database
router.post('/services', (req, res) => {
  return ServiceController.createService(req, res);
});


/* Examples of adding, updating and deleting data */

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  console.log('here');
  // const { id, update } = req.body;
  // Data.findByIdAndUpdate(id, update, (err) => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  // const { id } = req.body;
  // Data.findByIdAndRemove(id, (err) => {
  //   if (err) return res.send(err);
  //   return res.json({ success: true });
  // });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  // let data = new Data();
  //
  // const { id, message } = req.body;
  //
  // if ((!id && id !== 0) || !message) {
  //   return res.json({
  //     success: false,
  //     error: 'INVALID INPUTS',
  //   });
  // }
  // data.message = message;
  // data.id = id;
  // data.save((err) => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });
});

/* End of examples */

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
//app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
app.listen(process.env.SERVER_PORT, () => console.log(`LISTENING ON PORT ${process.env.SERVER_PORT}`));
