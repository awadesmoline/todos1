'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      isIn: [['in progress', 'done', 'not started']],
    }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    })
  };
  return Todo;
};