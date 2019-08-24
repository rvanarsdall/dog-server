module.exports = function(sequelize, DataTypes) {
    return sequelize.define("service-request", {

      dateRequested: {
        type: DataTypes.STRING
      },
      timeRequested: {
        type: DataTypes.STRING
      },
      walkerId: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.STRING
      },
      isAccepted: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      ownerNotified: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      reviewTitle: {
        type: DataTypes.STRING
      },
      review: {
        type: DataTypes.STRING
      }
        
    });
  };