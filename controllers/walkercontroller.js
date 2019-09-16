var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var serviceRequestTable = sequelize.import("../models/serviceRequestTable");
var Auth = sequelize.import("../models/userTable");
var Sequelize = require("sequelize");
var reqTable = require("../models/serviceRequestTable");

router.put("/update", function(req, res) {
  var user = req.user.id;
  var ownerData = req.body.data;

  Auth.update(
    {
      address: ownerData.street,
      city: ownerData.city,
      state: ownerData.state,
      zip: ownerData.zipcode,
      phoneNumber: ownerData.phoneNumber,
      bio: ownerData.bio,
      pic: ownerData.picture,
      rating: ownerData.rating,
      numberOfWalks: ownerData.numberOfWalks
    },
    { where: { id: user } }
  ).then(
    function updateSuccess(updatedLog) {
      res.json({
        data: updatedLog
      });
    },
    function updateError(err) {
      res.send(500, err.message);
    }
  );
});
//Request Create

router.post("/create-request", function(req, res) {
  var userid = req.user.id;
  var addingRequestData = req.body.data;

  serviceRequestTable
    .create({
      dateRequested: addingRequestData.dateRequested,
      timeRequested: addingRequestData.timeRequested,
      userId: userid
    })
    .then(
      function createSuccess(data) {
        res.json({
          data: data
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
});

//request update

router.put("/update-request/:id", function(req, res) {
  var userid = req.user.id;
  var updateRequestData = req.body.data;
  var requestID = req.params.id;

  serviceRequestTab
    .update(
      {
        dateRequested: updateRequestData.dateRequested,
        timeRequested: updateRequestData.timeRequested,
        walkerId: updateRequestData.walkerId,
        isAccepted: updateRequestData.isAccepted,
        isCompleted: updateRequestData.isCompleted,
        ownerNotified: updateRequestData.ownerNotified,
        reviewTitle: updateRequestData.reviewTitle,
        review: updateRequestData.review,
        dogs: updateRequestData.dogs
      },
      {
        where: {
          id: requestID,
          userId: userid.toString()
        }
      }
    )
    .then(
      function updateSuccess(updatedService) {
        res.json(updatedService);
      },
      err => res.send(500, err.message)
    );
});

//WALKER PENDING REQUESTS

router.get("/pending-requests/", function(req, res) {
  var userID = req.user.id;

  serviceRequestTable
    .findAll({
      where: { walkerId: userID.toString(), isAccepted: false }
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

//WALKER REQUESTS ACCEPTED TABLE
router.get("/accepted-requests/", function(req, res) {
  var walkerID = req.user.id;

  serviceRequestTable
    .findAll({
      where: { walkerId: walkerID.toString(), isAccepted: true }
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

//OWNER REQUEST TABLE

router.get("/owner-requests/", function(req, res) {
  var userID = req.user.id;

  serviceRequestTable
    .findAll({
      where: { userId: userID.toString() }
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

//REVIEW TABLE WALKER DASHBOARD

router.get("/list-reviews-dashboard/", function(req, res) {
  var userID = req.user.id;

  serviceRequestTable
    .findAll({
      where: { userId: userID.toString() }
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

router.get("/test/", function(req, res) {
  // var userID = req.user.id;

  sequelize
    .query(
      "SELECT * from pets LEFT OUTER JOIN users ON 'pets.userId'='users.id' where 'pets.userId'='5'"
    )
    .then(
      ([results, metadata]) => {
        res.json(results);
        // res.json(metadata)
        // Results will be an empty array and metadata will contain the number of affected rows.
      },
      function findAllError(err) {
        res.send(500, err);
      }
    );
});

// ANYTHING WALKER UPDATES
router.put("/walker-update-request/:id", function(req, res) {
  var userid = req.user.id;
  var updateRequestData = req.body.data;
  var requestID = req.params.id;

  serviceRequestTable
    .update(
      {
        dateRequested: updateRequestData.dateRequested,
        timeRequested: updateRequestData.timeRequested,
        walkerId: updateRequestData.walkerId,
        isAccepted: updateRequestData.isAccepted,
        isCompleted: updateRequestData.isCompleted,
        ownerNotified: updateRequestData.ownerNotified,
        reviewTitle: updateRequestData.reviewTitle,
        review: updateRequestData.review,
        dogs: updateRequestData.dogs
      },
      {
        where: {
          id: requestID,
          walkerId: userid.toString()
        }
      }
    )
    .then(
      function updateSuccess(updatedService) {
        res.json(updatedService);
      },
      err => res.send(500, err.message)
    );
});

module.exports = router;
