var router = require('express').Router();
var sequelize = require('../db');
var petTable = sequelize.import('../models/petTable');


router.post('/create', function (req, res) {
    var owner = req.userTable.id;
    var pets = req.body.pets.item;

    petTable
    .create({
        pets: pets,
        owner: owner
    })
    .then(
        function createSuccess(pets) {
            res.json({
                pets: pets
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    petTable
    .findAll({
        where: { id: data, owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

router.delete('/delete/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    petTable
    .destroy({
        where: { id: data, owner: userid }
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log");
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );
});

router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var pets = req.body.pets.item;

    petTable
    .update({
        pets: pets
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            res.json({
                pets: pets
            });
        },
        function updateError(err){
            res.send(500, err.message);
        }
    )
    });

module.exports = router;
