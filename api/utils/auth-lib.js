/**
 * This file contains necessary functions for authentication purpose.
 */

const crypto = require('crypto');

/**
 * Generate a random 256 byte string in hex format.
 */
const getSecret = () => crypto.randomBytes(256).toString('hex');

const isAuth = (req, res, next) =>
  req.session.isAuth
    ? next()
    : next({
        status: 401,
        message: 'You have not the permission to call the api.',
      });

module.exports = {
  isAuth,
  getSecret,
};
