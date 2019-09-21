module.exports = function(sequelize, DataTypes) {
  return sequelize.define("servicerequest", {
    dateRequested: {
      type: DataTypes.STRING
    },
    timeRequested: {
      type: DataTypes.STRING
    },
    walkerid: {
      type: DataTypes.INTEGER
    },
    userid: {
      type: DataTypes.INTEGER
    },
    isaccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    iscompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ownernotified: {
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
