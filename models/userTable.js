module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {

      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      petName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountType: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      pic: {
        type: DataTypes.OBJECT,
        allowNull: true
      },
      rating: {
        type: DataTypes.NUMBER,
        allowNull: true
      },
      numberOfWalks: {
        type: DataTypes.NUMBER,
        allowNull: false
      }


      
    });
  };
  