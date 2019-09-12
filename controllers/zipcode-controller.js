var router = require("express").Router();
var sequelize = require("../db");
var zipcode = sequelize.import("../models/userTable");
var Sequelize = require('sequelize')
const fetch = require("node-fetch");



router.post("/nearby", function(req,res){
    let zipcodeRequested = req.body.zipcode
let api= `http://api.geonames.org/findNearbyPostalCodes?postalcode=${zipcodeRequested}&country=US&radius=10&username=rvanar`



}
)

router.post("/check", function(req, res) {
  var data = req.body.zipcode;
  const Op = Sequelize.Op;
  // [Op.or]:['46239']

  zipcode
    .findAll({
      where: {
        [Op.or]: [
            { zip: '46239' },
       
            { zip: '45673' }
          ], accountType: 'walker'
        }
    }
    )  
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

module.exports = router;
