var router = require('express').Router();
var sequelize = require('../db');
var petTable = sequelize.import('../models/petTable');


router.post('/create', function (req, res) {
    var owner = req.user.id;
    var pets = req.body.data.pets;
    var image = req.body.data.image;
    var breed = req.body.data.breed;
    var age = req.body.data.age;
    var weight = req.body.data.weight;
    var gender = req.body.data.gender;

    petTable
    .create({
        userId: owner,
        petName: pets,
        petPic: image,
        breed: breed,
        age: age,
        weight: weight,
        gender: gender,
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
    var userId = req.user.id;

    petTable
    .findAll({
        where: { id: data, userId: userId }
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
    var userId = req.user.id;

    petTable
    .destroy({
        where: { id: data, userId: userId }
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a dog");
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );
});

router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var pets = req.body.data.pets;

    petTable
    .update({
        petName: data.pets,
        petPic: data.petPic,
        breed: data.breed,
        age: data.age,
        weight: data.weight,
        gender: data.gender,
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            res.json({
                petName: pets
            });
        },
        function updateError(err){
            res.send(500, err.message);
        }
    )
    });

module.exports = router;
