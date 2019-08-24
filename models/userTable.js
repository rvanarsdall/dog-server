module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {

      userName:{
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      zip: {
        type: DataTypes.NUMBER
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      petName: {
        type: DataTypes.STRING
      },
      breed: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.STRING
      },
      weight: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.BOOLEAN
      },
      bio: {
        type: DataTypes.STRING
      },
      accountType: {
        type: DataTypes.BOOLEAN
      },
      pic: {
        type: DataTypes.OBJECT
      },
      rating: {
        type: DataTypes.NUMBER
      },
      numberOfWalks: {
        type: DataTypes.NUMBER
      }


      
    });
  };
  