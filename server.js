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

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

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

//fetch user by id
router.get('/users/:_id', (req, res) => {
  if(typeof req.params.id === String) {
    req.params.id = mongoose.Types.ObjectId(req.params.id);
  }
  return UsersController.getUser(req, res);
})

//fetch user services by user id
router.get('/users/:_id/services', (req, res) => {
  return UsersController.getUserServices(req, res);
});

//fetch all users
router.get('/services', (req, res) => {
  return ServiceController.getServices(req, res);
});


//user login
router.post('/login', (req, res) => {
  return UsersController.userLogin(req, res);
});

//add user
router.post('/users', (req, res) => {
  return UsersController.createUser(req, res);
});

//add service
router.post('/services', (req, res) => {
  return ServiceController.createService(req, res);
});

//update service by id
router.put('/services/:id', (req, res) => {
  return ServiceController.updateService(req, res);
});


//delete a user's service by id
router.delete('/services/:user/:id', (req, res) => {
  return ServiceController.deleteService(req, res);
});

// append /api for requests
app.use('/api', router);

//stating which port api will run on
app.listen(process.env.SERVER_PORT, () => console.log(`LISTENING ON PORT ${process.env.SERVER_PORT}`));
