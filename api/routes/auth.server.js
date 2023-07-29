const express = require('express'),
  bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model'),
  logger = require('../utils/logger');

const auth = express.Router();

auth
  .route('/register')

  .post(async (req, res, next) => {
    logger.info('auth.server post enter');
    const { username, password } = req.body;

    if (!username || !password) {
      logger.error('Request parameter are missing');
      logger.info('auth.server post exit');
      return next({ status: 400, message: 'Request parameter are missing' });
    }

    let user = await UserModel.findOne({ username });

    if (user) {
      logger.error('User already exist');
      logger.info('auth.server post exit');
      return next({ status: 401, message: 'The user already exist' });
    }

    try {
      user = new UserModel({
        username,
        password: await bcrypt.hash(password.trim(), 12),
      });
      await user.save();
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
    logger.info('create new user');
    logger.info('auth.server post exit');
    return res.sendStatus(201);
  })
  .all((req, res, next) => {
    return next({ status: '405', message: 'Methode are not supported' });
  });

auth
  .route('/login')
  .get(async (req, res, next) => {
    logger.info('auth.server get enter');
    const { username, password } = req.query;

    if (!username || !password) {
      logger.error('Some request parameters are missing');
      logger.info('auth.server get enter');
      return next({
        status: 400,
        message: 'Some request parameters are missing',
      });
    }
    const user = await UserModel.findOne({ username });

    if (!user) {
      logger.error('User does not exist');
      logger.info('auth.server get exit');
      return next({ status: 401, message: 'User does not exist' });
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      logger.error('The password was wrong');
      logger.info('auth.server get exit');
      return next({ status: 403, message: 'The password was wrong' });
    }

    req.session.isAuth = true;
    req.session.username = username;

    logger.info('User joined');
    logger.info('auth.server get exit');
    // eslint-disable-next-line no-underscore-dangle
    return res.status(200).json({ id: user._id });
  })
  .all((req, res, next) => {
    return next({ status: '405', message: 'Methodes are not supported' });
  });

auth
  .route('/logout/')
  .delete((req, res, next) => {
    logger.info('auth.server delete enter');
    if (!req.session.isAuth) {
      logger.error('No permission');
      logger.info('auth.server delete exit');
      return next({ status: 403, message: 'No permission' });
    }

    req.session.destroy();

    logger.info('Session deleted');
    logger.info('auth.server delete exit');
    return res.sendStatus(200);
  })
  .all((req, res, next) => {
    return next({ status: '405', message: 'Methodes are not supported' });
  });

auth.route('/isauth').get(async (req, res, next) => {
  let user;
  try {
    user = await UserModel.find({ username: req.session.username });
  } catch (err) {
    return next({ message: 'Can not find a user', status: 500 });
  }
  if (req.session.isAuth) {
    // eslint-disable-next-line no-underscore-dangle
    return res.status(200).json({ user: user._id });
  }
  return res.sendStatus(403);
});

module.exports = auth;
