const { LotteryTicket, User } = require('../models');
const jwt = require('jsonwebtoken');

exports.getAllLottery = async (req, res, next) => {
  try {
    const lottery = await LotteryTicket.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ lottery });
  } catch (error) {
    next(error);
  }
};

exports.getLotteryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lottery = await LotteryTicket.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    res.status(200).json({ lottery });
  } catch (error) {
    next(error);
  }
};

exports.createLotteryTicket = async (req, res, next) => {
  try {
    const { lotteryNumber, lotteryQuantity, lotteryLocation } = req.body;
    const lottery = await LotteryTicket.create({
      lotteryNumber,
      lotteryQuantity,
      lotteryLocation,
      userId: req.user.id,
    });
    res.status(201).json({ lottery });
  } catch (error) {
    next(error);
  }
};

exports.updateLottery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lotteryNumber, lotteryQuantity, lotteryLocation } = req.body;
    const [rows] = await LotteryTicket.update(
      {
        lotteryNumber,
        lotteryQuantity,
        lotteryLocation,
      },
      {
        where: {
          id,
          userId: req.user.id,
        },
      }
    );
    if (rows === 0) {
      res.status(404).json({
        message: 'Lottery is not found',
      });
    }
    res.status(200).json({
      message: 'Lottery updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteLottery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await LotteryTicket.destroy({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (rows === 0) {
      res.status(404).json({
        message: 'Fail to delete lottery',
      });
    }
    res.status(200).json({
      message: 'Lottery deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
