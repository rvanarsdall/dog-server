require('dotenv').config();

var express = require('express');
var app = express();
var user= require('./controllers/usercontroller')
var walkerRequest= require('./controllers/walkercontroller')
var dogOwner = require('./controllers/ownercontroller')
var zipcode =require('./controllers/zipcode-controller')

// var fakeDataCreating = require('./controllers/databasedatacontroller')

var sequelize = require('./db')
var bodyParser = require('body-parser');


sequelize.sync()

app.use(bodyParser.json())

app.use(require('./middleware/headers'))

app.use('/user', user )  //Handling User signup/ login

// app.use('/create', fakeDataCreating) //used for creating fake data in database for demo mode

app.use(require('./middleware/validate-session'))

app.use('/walker', walkerRequest) // used for walker request

app.use('/owner',dogOwner) // adding pets based on dog owners

app.use('/zipcode',zipcode) // adding pets based on dog owners


 
app.listen(process.env.PORT, function(){
  console.log(`App is listening on port ${process.env.PORT}`);
}) 
