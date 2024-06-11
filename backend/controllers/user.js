const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');

const {
  CANT_CREATE_USER,
  NICK_CONFLICT,
  EMAIL_CONFLICT,
  INCORRECT_DATA,
  // AUTH_REQUIRED,
  ID_NOT_FOUND,
} = require('../utils/errors');

const BadRequest = require('../utils/errorsClasses/ErrorBadRequest');
const Conflict = require('../utils/errorsClasses/ErrorConflict');
const NotFound = require('../utils/errorsClasses/ErrorNotFound');
const Unauthorized = require('../utils/errorsClasses/ErrorUnauthorized');
const { OK } = require('../utils/responses');

const { JWT_SECRET, STATUS } = process.env;

const createUser = (req, res, next) => {
  const {
    nick, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userSchema.create({
      nick,
      email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        return next(new BadRequest(CANT_CREATE_USER));
      }
      return res.send(
        {
          nick: user.nick,
          email: user.email,
        },
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err.name);
        next(new BadRequest(INCORRECT_DATA));
      }
      if (err.code === 11000 && err.keyPattern.email) {
        next(new Conflict(EMAIL_CONFLICT));
      } else if (err.code === 11000 && err.keyPattern.nick) {
        next(new Conflict(NICK_CONFLICT));
      }
    });
};

const login = async (req, res, next) => {
  const { nick, password } = req.body;
  console.log(req.body);
  userSchema.findOne({ nick }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new Unauthorized(INCORRECT_DATA));
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new Unauthorized(INCORRECT_DATA);
          } else {
            const token = jwt.sign(
              { _id: user.id },
              STATUS === 'production' ? JWT_SECRET : 'some-secret-key',
              { expiresIn: '7d' },
            );
            res.status(OK).send({ token });
          }
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  userSchema
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(ID_NOT_FOUND);
      }
      return res.status(OK).send({
        nick: user.nick,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  userSchema
    .findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        next(new NotFound(ID_NOT_FOUND));
        return;
      }
      res.send({
        nick: user.nick,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(INCORRECT_DATA));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
