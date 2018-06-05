var todosController = require('../controllers').todos
var todoItemsController = require('../controllers').todoItems

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Welcome to the Todos API!'
    })
  })

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/todos/:todoId/todoItems', todoItemsController.create);
  app.get('/api/todos/:todoId', todosController.retrieve);
}