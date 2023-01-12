'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment }) {
      this.hasMany(Post, {foreignKey: 'userId', as: 'posts'});
      this.hasMany(Comment, {foreignKey: 'userId', as: 'comments'});
    }
  }
  User.init(
    {
    nickname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    confirm: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};