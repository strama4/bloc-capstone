'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isEmail: {msg: 'Must be a valid email'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes'
    })
  };
  return User;
};