module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lineId: {
        type: DataTypes.STRING,
      },
      facebookId: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      etc: {
        type: DataTypes.STRING,
      },
      imageProfile: {
        type: DataTypes.STRING,
      },
      qrCodeLine: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  UserProfile.associate = function (models) {
    UserProfile.belongsTo(
      models.User,
      {
        foreignKey: 'userId',
        allowNull: false,
      },
      {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }
    );
  };
  return UserProfile;
};
