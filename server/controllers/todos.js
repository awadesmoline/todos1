var Todo = require('../models').Todo;
var TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    const status = req.body.status.toLowerCase()
    return Todo.create({
      title: req.body.title,
      status,
    }).then(todo => res.status(201).send(todo)) // 201 for post request, 200 for get requests
    .catch(error => res.status(400).send(error))
  },

  list(req, res) {
    return Todo.findAll({
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    }).then(todos => res.status(200).send(todos))
    .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return Todo.findById(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    }).then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        })
      }
      return res.status(200).send(todo);
    }).catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Todo.findById(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    }).then(todo => {
      if (!todo) {
        res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      return todo.update({
        title: req.body.title || todo.title
      }).then(todo => res.status(200).send(todo))
      .catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo.findById(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(400).send({
          message: 'Todo Not Found',
        });
      }
      if (todo.status !== 'done') {
        return res.status(400).send({
          message: 'Todo is not done. You can only delete todos that are done'
        })
      }
      return todo.destroy()
        .then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
        .catch(error => res.status(400).send(error))
    }).catch(error => res.status(400).send(error));
  },
}