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
      userid: userid,
      walkerid: addingRequestData.walkerID,
      dogs: addingRequestData.dogs
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

//DELETING REQUEST
router.delete("/delete/:id", function(req, res) {
  var data = req.params.id;
  var userid = req.user.id;

  serviceRequestTable
    .destroy({
      where: { id: data, userid: userid }
    })
    .then(
      function deleteLogSuccess(data) {
        res.status(200).json({ message: "you killed a dog request" });
      },
      function deleteLogError(err) {
        res.status(500).json(err.message);
      }
    );
});

//request update

router.put("/update-request/:id", function(req, res) {
  var userid = req.user.id;
  var updateRequestData = req.body.data;
  var requestID = req.params.id;

  serviceRequestTable
    .update(
      {
        dateRequested: updateRequestData.dateRequested,
        timeRequested: updateRequestData.timeRequested,
        walkerid: updateRequestData.walkerId,
        isaccepted: updateRequestData.isAccepted,
        iscompleted: updateRequestData.isCompleted,
        ownernotified: updateRequestData.ownerNotified,
        reviewTitle: updateRequestData.reviewTitle,
        review: updateRequestData.review
      },
      {
        where: {
          id: requestID,
          userid: userid
        }
      }
    )
    .then(
      function updateSuccess(updatedService) {
        res.json(updatedService);
      },
      err => res.send(500, err)
    );
});

router.put("/walker-update-request/:id", function(req, res) {
  var walkerid = req.user.id;
  var updateRequestData = req.body.data;
  var requestID = req.params.id;

  serviceRequestTable
    .update(
      {
        isaccepted: updateRequestData.isAccepted,
        iscompleted: updateRequestData.isCompleted,
        walkerid: updateRequestData.walkerID
      },
      {
        where: {
          id: requestID
        }
      }
    )
    .then(
      function updateSuccess(updatedService) {
        res.json(updatedService);
      },
      err => res.send(500, err)
    );
});

//WALKER PENDING REQUESTS

// router.get("/pending-requests/", function(req, res) {
//   var requestID = req.user.id;

//   serviceRequestTable
//     .findAll({
//       where: { walkerid: requestID, isAccepted: false }
//     })
//     .then(
//       function findAllSuccess(data) {
//         res.json(data);
//       },
//       function findAllError(err) {
//         res.send(500, err.message);
//       }
//     );
// });

// //WALKER REQUESTS ACCEPTED
// router.get("/accepted-requests/", function(req, res) {
//   var walkerID = req.user.id;

//   serviceRequestTable
//     .findAll({
//       where: { walkerid: walkerID, isAccepted: true }
//     })
//     .then(
//       function findAllSuccess(data) {
//         res.json(data);
//       },
//       function findAllError(err) {
//         res.send(500, err.message);
//       }
//     );
// });

//OWNER REQUEST TABLE

router.get("/owner-requests/", function(req, res) {
  // var userID = req.user.id;
  sequelize
    .query(
      `SELECT * from users INNER JOIN servicerequests ON servicerequests.walkerid=users.id  where servicerequests.userid=${req.user.id} ORDER BY servicerequests.id`
    )
    .then(
      ([results, metadata]) => {
        res.json(results);
      },
      function findAllError(err) {
        res.send(500, err);
      }
    );
  // serviceRequestTable
  //   .findAll({
  //     where: { userid: userID.toString() }
  //   })
  //   .then(
  //     function findAllSuccess(data) {
  //       res.json(data);
  //     },
  //     function findAllError(err) {
  //       res.send(500, err.message);
  //     }
  //   );
});

router.get("/basic-info/:id", function(req, res) {
  var userID = req.params.id;

  Auth.findAll({
    where: { id: userID }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});
/// WALKER PENDING REQUESTS
router.get("/pending-requests/", function(req, res) {
  // var userID = req.user.id;
  // walkerid=${req.user.id} AND
  sequelize
    .query(
      `SELECT * from users INNER JOIN servicerequests ON servicerequests.userid=users.id where walkerid=${req.user.id} AND servicerequests.isaccepted=false ORDER BY servicerequests.id`
    )
    .then(
      ([results, metadata]) => {
        res.json(results);
      },
      function findAllError(err) {
        res.send(500, err);
      }
    );
});

///WALKER ACCEPTED REQUESTS
router.get("/accepted-requests/", function(req, res) {
  // var userID = req.user.id;
  // walkerid=${req.user.id} AND
  sequelize
    .query(
      `SELECT * from users INNER JOIN servicerequests ON servicerequests.userid=users.id  where walkerid=${req.user.id} AND servicerequests.isaccepted=true ORDER BY servicerequests.id`
    )
    .then(
      ([results, metadata]) => {
        res.json(results);
      },
      function findAllError(err) {
        res.send(500, err);
      }
    );
});

module.exports = router;
