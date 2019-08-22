
var express = require('express')
var router = express.Router()
var sequelize = require('../db')

var petTable = sequelize.import('../models/petTable')
var serviceRequestTable = sequelize.import('../models/serviceRequestTable')




// CreateRequest(/create)
// Get SearchRequest(/find) - search the userTable with zip code nearby that are petWalker or both make sure it’s not sure owner populates on there
// update(/booked) - Found a provider and would like to book them - We need to update the PetRequest Row with the Petwalker’s UserID and changed the isBooked to Yes


//PetOwner adding dogs

router.post('/adding-pet', function(req,res){
    var userid = req.user.id
    var addingPetData = req.body.data

    petTable.create({

    })
})

//fetch all pets for owner
router.get("/displaying-pets", function(req, res) {
    var userid = req.user.id;
  
    petTable.findAll({
      where: { ownerID: userid },
      order: [["id", "ASC"]]
    }).then(
      function findAllSuccess(data) {
        res.json(data);
        console.log(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
  });


//Requesting
//Request Create

router.post('/create-request', function(req,res){
    var userid = req.user.id
    var addingRequestData = req.body.data

    serviceRequestTable.create({

    })
})


//request update
var userid = req.user.id
var updateRequestData = req.body.data

router.put('/update-request', function(req,res){


})






module.exports = router;
