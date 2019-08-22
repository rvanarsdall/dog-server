module.exports = function(sequelize, DataTypes) {
    return sequelize.define("pets", {

      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      petName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      petPic: {
        type: DataTypes.OBJECT,
        allowNull: true
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      weight: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
        });
  };