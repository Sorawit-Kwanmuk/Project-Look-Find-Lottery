const express = require('express');
const lotteryController = require('../controllers/lotteryController');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

router.get('/', lotteryController.getAllLottery);
router.get('/:id', lotteryController.getLotteryById);
router.post('/', authenticate, lotteryController.createLotteryTicket);
router.put('/:id', authenticate, lotteryController.updateLottery);
router.delete('/:id', authenticate, lotteryController.deleteLottery);

module.exports = router;