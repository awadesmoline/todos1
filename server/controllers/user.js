var User = require('../models').User;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const signedUser = function(user) {
  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET, { expiresIn: 86400 });
  const attributes = {
    name: user.name,
    email: user.email
  }
  return { token, attributes }
}

module.exports = {
  sign_up(req, res) {
    const { name, email, password } = req.body;
    return User.findOne({ where: { email }})
      .then(user => {
        if (user) {
          res.status(409).send({ message: 'User already exists' });
        } else {
          const hash_password = bcrypt.hashSync(password, 10);
          User.create({
            name, email, password: hash_password
          }).then(createdUser => {
            const { token, attributes } = signedUser(createdUser);
            res.status(201).send({ token, expiresIn: 86400, user: attributes });
          }).catch(error => res.status(400).send(error));
        }
      }).catch(error => res.status(400).send(error));
  },
  sign_in(req, res) {
    const { email, password } = req.body;
    return User.findOne({ where: { email }})
      .then(user => {
        console.log('user', bcrypt.compareSync(password, user.password))
        if (user && bcrypt.compareSync(password, user.password)) {
          const { token, attributes } = signedUser(user);
          res.status(201).send({ token, expiresIn: 86400, user: attributes });
        } else {
          res.status(401).send({ message: 'Invalid email/password' })
        }
      }).catch(error => res.status(400).send(error));
  }
}
