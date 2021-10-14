const { User, UserProfile } = require('../models');

exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    //join table user and table user_profile
    const user = await User.findOne({
      where: { id },
      attributes: ['username', 'email', 'phone'],

      include: [
        {
          model: UserProfile,
          attributes: [
            'name',
            'lineId',
            'facebookId',
            'location',
            'etc',
            'imageProfile',
            'qrCodeLine',
          ],
        },
      ],
    });

    // console.log(userProfile);
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      name,
      email,
      phone,
      lineId,
      facebookId,
      location,
      etc,
      imageProfile,
      qrCodeLine,
      status,
    } = req.body;
    console.log('status: ', status);
    console.log('req.body: ', req.body);
    // console.log(req.body);
    if (status === 'update') {
      const resultUser = await User.update(
        {
          username,
          email,
          phone,
        },
        {
          where: { id },
        }
      );
      const resultUserProfile = await UserProfile.update(
        {
          name,
          lineId,
          facebookId,
          location,
          etc,
          imageProfile,
          qrCodeLine,
          userId: id,
        },
        {
          where: { user_id: id },
        }
      );
      res.status(200).json({
        status: 'success',
        resultUser,
        resultUserProfile,
      });
    } else if (status === 'create') {
      const resultProfile = await UserProfile.create({
        name,
        lineId,
        facebookId,
        location,
        etc,
        imageProfile,
        qrCodeLine,
        userId: id,
      });
      res.status(200).json({
        status: 'success',
        resultProfile,
      });
    }
  } catch (error) {
    next(error);
  }
};
