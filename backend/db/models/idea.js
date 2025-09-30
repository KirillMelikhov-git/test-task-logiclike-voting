'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Idea extends Model {
    static associate(models) {
      // Одна идея имеет много голосов
      Idea.hasMany(models.Vote, {
        foreignKey: 'ideaId',
        as: 'votes'
      });
    }
  }
  
  Idea.init({
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    votesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Idea',
    tableName: 'Ideas'
  });
  
  return Idea;
};
