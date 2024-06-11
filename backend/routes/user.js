const router = require('express').Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/user');

router.put('/me', updateUser);
router.get('/me', getCurrentUser);

module.exports = router;
