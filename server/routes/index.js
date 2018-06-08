var todosController = require('../controllers').todos
var todoItemsController = require('../controllers').todoItems
var userController = require('../controllers/user');
var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized Access '});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid Token ' });
    }
    req.decoded = decoded;
    next();
  })
};

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Welcome to the Todos API!'
    })
  })

  app.post('/api/sign_up', userController.sign_up)
  app.post('/api/sign_in', userController.sign_in)

  app.post('/api/todos', verifyToken, todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/todos/:todoId/todoItems', verifyToken, todoItemsController.create);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', verifyToken, todosController.update);
  app.delete('/api/todos/:todoId', verifyToken, todosController.destroy);
  app.put('/api/todos/:todoId/todoItems/:todoItemId', verifyToken, todoItemsController.update);
  app.delete('/api/todos/:todoId/todoItems/:todoItemId', verifyToken, todoItemsController.destroy);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/todoItems', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
}