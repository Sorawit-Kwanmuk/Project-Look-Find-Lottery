// const { sequelize } = require('./models');
// sequelize.sync({
//   force: true,
// });
require('dotenv').config();
const lotteryRoute = require('./routes/lotteryRoute');
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');
const image = require('./routes/imagesRoute');
// const passport = require('passport');
// require('./config/passport');

const errorController = require('./controllers/errorController');
const cors = require('cors');

const express = require('express');
const passport = require('passport');

const app = express();

app.use(passport.initialize());

app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));

app.use('/profiles', profileRoute);
app.use('/upload', image);
app.use('/lotteries', lotteryRoute);
app.use('/', authRoute);

//path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

//error handling middleware
app.use(errorController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
