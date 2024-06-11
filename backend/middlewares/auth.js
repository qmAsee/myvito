const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/errorsClasses/ErrorUnauthorized');

const { JWT_SECRET, STATUS } = process.env;

const { AUTH_REQUIRED } = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(AUTH_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(
      token,
      STATUS === 'production' ? JWT_SECRET : 'some-secret-key',
      { expiresIn: '7d' },
    );
  } catch {
    throw new Unauthorized(AUTH_REQUIRED);
  }

  req.user = payload;
  next();
};

module.exports = { auth };
