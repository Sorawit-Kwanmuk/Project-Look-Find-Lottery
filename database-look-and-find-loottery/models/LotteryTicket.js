module.exports = (sequelize, DataTypes) => {
  const LotteryTicket = sequelize.define(
    'LotteryTicket',
    {
      lotteryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lotteryQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lotteryLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateInput: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  LotteryTicket.associate = function (models) {
    LotteryTicket.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return LotteryTicket;
};
