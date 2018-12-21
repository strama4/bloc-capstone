'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: {msg: 'Recipe name cannot be blank'}
      }
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Recipe;
};