/* eslint-disable no-param-reassign */
const express = require('express');
const { default: mongoose } = require('mongoose');

const UserModel = require('../models/user.model'),
  logger = require('../utils/logger'),
  Auth = require('../utils/auth-lib');

const statistic = express.Router();

statistic
  .route('/:questionId')
  .patch(Auth.isAuth, async (req, res, next) => {
    logger.info('statistic.server patch enter');
    const { questionId } = req.params;
    const { userId, isCorrect, time, domain, type } = req.body;

    if (!userId || !isCorrect || !time || !domain || !type) {
      logger.error('No valid input data');
      logger.info('statistic.server patch exit');
      return next({ status: 404, message: 'No valid input data.' });
    }

    if (
      !mongoose.isValidObjectId(new mongoose.Types.ObjectId(userId)) ||
      !mongoose.isValidObjectId(new mongoose.Types.ObjectId(questionId))
    ) {
      logger.error('No valid input data');
      logger.info('statistic.server patch exit');
      return next({
        status: 404,
        message: 'questionId or userId are not valid',
      });
    }

    try {
      const user = await UserModel.findById(
        new mongoose.Types.ObjectId(userId)
      );
      if (
        user.questions.length === 0 ||
        !user.questions.some((question) =>
          question.questionId.equals(new mongoose.Types.ObjectId(questionId))
        )
      ) {
        user.questions.push({
          domain,
          questionId: new mongoose.Types.ObjectId(questionId),
          time: Number(time),
          numRightAnswer: isCorrect === 'true' ? 1 : 0,
          numWrongAnswer: isCorrect === 'false' ? 1 : 0,
          dbType: type,
        });
        await user.save();
      } else {
        user.questions.map((question) => {
          if (
            question.questionId.equals(new mongoose.Types.ObjectId(questionId))
          ) {
            if (isCorrect === 'true') {
              question.numRightAnswer += 1;
            } else {
              question.numWrongAnswer += 1;
            }
            const counts = question.numRightAnswer + question.numWrongAnswer;
            const newTime = Number(time) + question.time;
            question.time = newTime / counts;
          }
          return question;
        });
        await user.save();
      }
    } catch (error) {
      logger.error('Something went wrong, went reading data from user model');
      logger.info('statistic.server patch exit');
      return next({ status: 500, message: error.message });
    }

    logger.info(`modify statistic of user: ${userId}`);
    logger.info('statistic.server patch exit');
    return res.sendStatus(200);
  })
  .all((req, res, next) => {
    return next({ status: '405', message: 'Methode are not supported' });
  });

statistic.route('/user/:userId').get(Auth.isAuth, async (req, res, next) => {
  logger.info('statistic.server get enter');
  const { userId } = req.params;
  const { questionId, domain } = req.query;

  let query = {};

  if (
    !userId &&
    mongoose.isValidObjectId(new mongoose.Types.ObjectId(userId))
  ) {
    logger.info('statistic.server get exit');
    logger.error('There is no user id given');
    return next({ message: 'There is no user id given', status: 404 });
  }

  if (
    questionId &&
    mongoose.isValidObjectId(new mongoose.Types.ObjectId(questionId))
  ) {
    query = { ...query, questionId: new mongoose.Types.ObjectId(questionId) };
  }

  if (domain) {
    query = { ...query, domain };
  }

  let returnObjs;
  try {
    const { questions } =
      Object.keys(query).length === 0
        ? await UserModel.findById(new mongoose.Types.ObjectId(userId))
        : await UserModel.findById(new mongoose.Types.ObjectId(userId), {
            questions: { $elemMatch: query },
          });
    returnObjs = questions;
  } catch (error) {
    logger.error('Cannot interact with db');
    logger.info('statistic.server get exit');
    return next({ message: error.message, status: 404 });
  }

  if (returnObjs === null) {
    logger.error('returnObjs is null');
    logger.info('statistic.server get exit');
    return next({ status: 500, message: 'Something went wrong' });
  }

  logger.info('Send statistic data to client');
  logger.info('statistic.server get exit');
  return res.status(200).json(returnObjs);
});

module.exports = statistic;
