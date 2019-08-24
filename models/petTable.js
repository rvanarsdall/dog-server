module.exports = function(sequelize, DataTypes) {
    return sequelize.define("pets", {

      userId: {
        type: DataTypes.STRING
      },
      petName: {
        type: DataTypes.STRING
      },
      petPic: {
        type: DataTypes.OBJECT
      },
      breed: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.NUMBER
      },
      weight: {
        type: DataTypes.NUMBER
      },
      gender: {
        type: DataTypes.BOOLEAN
      }
        });
  };