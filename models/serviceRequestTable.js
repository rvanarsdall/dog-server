module.exports = function(sequelize, DataTypes) {
  return sequelize.define("servicerequest", {
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
      defaultValue: false
    },
    ownerNotified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reviewTitle: {
      type: DataTypes.STRING
    },
    review: {
      type: DataTypes.STRING(20000)
    },
    rating: {
      type: DataTypes.STRING
    },
    dogs: {
      type: DataTypes.STRING
    }
  });
};
