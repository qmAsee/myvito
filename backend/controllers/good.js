const goodSchema = require('../models/good');

const {
  INCORRECT_DATA,
  ID_NOT_FOUND,
  WRONG_GOOD_ID,
} = require('../utils/errors');

const BadRequest = require('../utils/errorsClasses/ErrorBadRequest');
const NotFound = require('../utils/errorsClasses/ErrorNotFound');
const Forbidden = require('../utils/errorsClasses/ErrorForbidden');
const { FORBIDDEN } = require('../utils/responses');

const createGood = (req, res, next) => {
  const {
    name,
    photo,
    text,
    date,
    address,
    owner,
  } = req.body;

  goodSchema
    .create({
      name,
      photo,
      text,
      date,
      address,
      owner,
    })
    .then((good) => res.status(201).send(good))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const deleteGood = (req, res, next) => {
  goodSchema
    .findById(req.params.goodId)
    .orFail(() => {
      throw new NotFound(ID_NOT_FOUND);
    })
    .then((good) => {
      if (req.user._id === good.owner) {
        goodSchema.deleteOne(good)
          .then(() => {
            res.send(good);
          })
          .catch(next);
      } else {
        throw new Forbidden(FORBIDDEN);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(WRONG_GOOD_ID));
      } else {
        next(err);
      }
    });
};

const updateGood = (req, res, next) => {
  goodSchema
    .findByIdAndUpdate(
      req.params.goodId,
      req.body,
      { new: true },
    )
    .then((good) => {
      if (req.user._id === good.owner) {
        res.send(good);
      } else {
        throw new Forbidden(FORBIDDEN);
      }
    })
    .catch(next);
};

const getGoods = (req, res, next) => {
  goodSchema
    .find({ owner: req.user._id })
    .then((goods) => {
      res.send(goods);
    })
    .catch(next);
};

module.exports = {
  createGood,
  deleteGood,
  updateGood,
  getGoods,
};
