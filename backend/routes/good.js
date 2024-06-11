const router = require('express').Router();

const {
  createGood,
  deleteGood,
  updateGood,
  getGoods,
} = require('../controllers/good');

router.post('/', createGood);
router.delete('/:goodId', deleteGood);
router.put('/:goodId', updateGood);
router.get('/', getGoods);

module.exports = router;
