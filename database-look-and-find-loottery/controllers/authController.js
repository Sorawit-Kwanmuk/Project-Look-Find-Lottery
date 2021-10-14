const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserProfile } = require('../models');

const CustomError = require('../utils/error');

exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    // const headers = req.headers;
    // console.log(headers);

    const { authorization } = req.headers;
    // console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      //authorization ถ้าใช้เป็น token ต้องขึ้นต้นด้วย Bearer เสมอ
      return res.status(401).json({
        message: 'You are Unauthorized',
      });
    }

    const token = authorization.split(' ')[1]; //ตัดตัว Bearer ที่มี ' ' ต่อท้ายออก เหลือแต่ token

    if (!token) {
      return res.status(401).json({
        message: 'You are Unauthorized',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //decode = {id:,email:,username:}
    const result = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!result) {
      return res.status(401).json({
        message: 'You are Unauthorized',
      });
    }
    req.result = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, phone, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      // return res.status(400).json({ message: 'Passwords do not match' });

      throw new CustomError('Passwords do not match', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10); //10 คือ salt
    await User.create({
      username,
      phone,
      email,
      password: hashedPassword,
    });

    // await UserProfile.create({
    //   name: '',
    //   line_id: '',
    //   facebook_id: '',
    //   location: '',
    //   etc: '',
    //   userId,
    // });
    res.status(201).json({ message: 'User account has been created' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, phone, password } = req.body;
    // console.log(username);
    let result;
    if (username) {
      result = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!result) {
        return res
          .status(400)
          .json({ message: 'Invalid username/phone or password' });
      }
    } else if (phone) {
      result = await User.findOne({
        where: {
          phone: phone,
        },
      });
      if (!result) {
        return res
          .status(400)
          .json({ message: 'Invalid username/phone or password' });
      }
    }
    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: 'Invalid username/phone or password' });
    }

    const payload = {
      id: result.id,
      phone: result.phone,
      email: result.email,
      username: result.username,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      expiresIn: '90d',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};
