module.exports = function(sequelize, DataTypes) {
    return sequelize.define("pets", {

      userId: {
        type: DataTypes.STRING
      },
      petName: {
        type: DataTypes.STRING
      },
      petPic: {
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
      }
        });
  };