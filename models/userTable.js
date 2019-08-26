module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {

      userName:{
        type: DataTypes.STRING
      },
      password: {
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
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.STRING(10000)
      },
      accountType: {
        type: DataTypes.STRING(200000)
      },
      pic: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.STRING
      },
      numberOfWalks: {
        type: DataTypes.STRING
      }


      
    });
  };
  