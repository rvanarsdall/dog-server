var router = require('express').Router();
var sequelize = require('../db');
var petTable = sequelize.import('../models/petTable');


router.post('/create', function (req, res) {
    // var owner = req.user.id;
    var petName = req.body.data.petName;
    var image = req.body.data.image;
    var breed = req.body.data.breed;
    var age = req.body.data.age;
    var weight = req.body.data.weight;
    var gender = req.body.data.gender;
    var bio = req.body.data.bio;

    petTable
    .create({
        userId: req.body.data.userId,
        petName: petName,
        petPic: image,
        breed: breed,
        age: age,
        weight: weight,
        gender: gender,
        bio: bio
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

    petTable
    .findAll({
        where: { userId: data }
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
    // var userId = req.user.id;
    var userId = 1


    petTable
    .destroy({
        where: { id: data, userId: userId.toString() }
    }).then(
        function deleteLogSuccess(data){
            res.status(200).json({message: 'deleted'});
        },
        function deleteLogError(err){
            res.status(500).json({message: err.message});
        }
    );
});

router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var pets = req.body.data;

    petTable
    .update({
        petName: pets.pets,
        petPic: pets.petPic,
        breed: pets.breed,
        age: pets.age,
        weight: pets.weight,
        gender: pets.gender,
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
