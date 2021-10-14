const express = require('express');
const lotteryController = require('../controllers/lotteryController');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

router.get('/', lotteryController.getAllLottery);
router.get('/all', lotteryController.getAllOfLottery);
router.get('/:id', lotteryController.getLotteryById);
router.get('/lottery/:id', lotteryController.getLotteryByLotteryId);
router.post('/:id', authenticate, lotteryController.createLotteryTicket);
router.put('/:id', authenticate, lotteryController.updateLottery);
router.delete('/:id', authenticate, lotteryController.deleteLottery);

module.exports = router;
