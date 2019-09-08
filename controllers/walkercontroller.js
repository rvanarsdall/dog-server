var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var serviceRequestTable = sequelize.import('../models/serviceRequestTable')
var Auth = sequelize.import('../models/userTable');


router.put('/update', function(req, res) {
  var user = req.user.id;
  var ownerData = req.body.data;

  Auth
  .update({
    address:ownerData.street,
    city: ownerData.city,
    state: ownerData.state,
    zip: ownerData.zipcode,
    phoneNumber: ownerData.phoneNumber,
    bio: ownerData.bio,
    pic: ownerData.picture,
    rating: ownerData.rating,
    numberOfWalks: ownerData.numberOfWalks
  },
  {where: {id: user}}
  ).then(
      function updateSuccess(updatedLog) {
          res.json({
              data: updatedLog
          });
      },
      function updateError(err){
          res.send(500, err.message);
      }
  )
  });
//Request Create

router.post('/create-request', function (req, res) {
  var userid = req.user.id
  var addingRequestData = req.body.data

  serviceRequestTable.create({
    dateRequested: addingRequestData.dateRequested,
    timeRequested: addingRequestData.timeRequested,
    userId: userid
  })
})


//request update

router.put('/update-request-owner/:id', function (req, res) {
  var userid = req.user.id
  var updateRequestData = req.body.data
  var requestID = req.params.id

  serviceRequestTable.update({
    dateRequested: updateRequestData.dateRequested,
    timeRequested: updateRequestData.timeRequested,
    walkerId: updateRequestData.walkerId,
    userId: userid,
    isAccepted: updateRequestData.isAccepted,
    isCompleted: updateRequestData.isCompleted,
    ownerNotified: updateRequestData.ownerNotified,
    reviewTitle: updateRequestData.reviewTitle,
    review: updateRequestData.review

  }, {
    where: {
      id: requestID, userId: userid.toString()
    }
  }).then(
    function updateSuccess(updatedService){
      res.json(updatedService)
    },
    (err)=> res.send(500, err.message)
  )
})


router.put('/update-request-walker/:id', function (req, res) {
  var userid = req.user.id
  var updateRequestData = req.body.data
  var requestID = req.params.id

  serviceRequestTable.update({
    dateRequested: updateRequestData.dateRequested,
    timeRequested: updateRequestData.timeRequested,
    walkerId: updateRequestData.walkerId,
    userId: userid,
    isAccepted: updateRequestData.isAccepted,
    isCompleted: updateRequestData.isCompleted,
    ownerNotified: updateRequestData.ownerNotified,
    reviewTitle: updateRequestData.reviewTitle,
    review: updateRequestData.review

  }, {
    where: {
      id: requestID, walkerId: userid.toString()
    }
  }).then(
    function updateSuccess(updatedService){
      res.json(updatedService)
    },
    (err)=> res.send(500, err.message)
  )
})






module.exports = router;