'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      // Голос принадлежит идее
      Vote.belongsTo(models.Idea, {
        foreignKey: 'ideaId',
        as: 'idea'
      });
    }
  }
  
  Vote.init({
    ideaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Vote',
    tableName: 'Votes'
  });
  
  return Vote;
};
