var User = require('../models').User;
var jwt = require('jsonwebtoken');

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
          User.create({
            name, email, password
          }).then(createdUser => {
            const { token, attributes } = signedUser(createdUser);
            res.status(200).send({ token, expiresIn: 86400, user: attributes });
          }).catch(error => res.status(400).send(error));
        }
      }).catch(error => res.status(400).send(error));
  }
}
