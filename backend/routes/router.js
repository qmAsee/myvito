const router = require('express').Router();
const userRouter = require('./user');
const goodsRouter = require('./good');
const NotFound = require('../utils/errorsClasses/ErrorNotFound');
const { auth } = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/user');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/goods', goodsRouter);

router.use('*', () => {
  throw new NotFound('Router. Запрашиваемый ресурс не найден');
});

module.exports = router;
