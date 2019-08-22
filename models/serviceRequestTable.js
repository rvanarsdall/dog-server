module.exports = function(sequelize, DataTypes) {
    return sequelize.define("service-request", {

      dateRequested: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timeRequested: {
        type: DataTypes.STRING,
        allowNull: false
      },
      walkerId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
      ownerNotified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
      reviewTitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true
      }
        
    });
  };