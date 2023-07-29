const express = require('express');
const lodash = require('lodash');
const { fuzzy } = require('fast-fuzzy');

const QuestionModel = require('../models/question.model'),
  logger = require('../utils/logger'),
  Auth = require('../utils/auth-lib');

const questionRoute = express.Router();

/** Mapper for single, multiple choice.
 * If all elements in the answer array match one or more of the properties in model.right array, than the answer is correct
 * @param {[string]} answer
 * @param {[string]} items all possible items
 * @param {[string]} model
 * @returns {{result: 'correct' | 'incorrect'}}
 */
const XChoice = (answer, items, model) => {
  const rightAnswer = answer.filter((el) => model.right.includes(el));

  const correctAnswer = items.filter((el) =>
    model.right.some((rightElement) => el === rightElement)
  );

  return rightAnswer.length === correctAnswer.length &&
    rightAnswer.length === answer.length
    ? { result: 'correct', correctAnswer, domain: model.domain }
    : { result: 'incorrect', correctAnswer, domain: model.domain };
};

/**
 * If the answer array contains the same elements than the model.right array than the answer is right.
 * @param {[string]} answer
 * @param {[string]} model
 * @returns {{result: 'correct' | 'incorrect'}}
 */
const fillInBlank = (answer, model) => {
  // Map the arrays to a string and compare both strings.
  if (JSON.stringify(answer) === JSON.stringify(model.right)) {
    return {
      result: 'correct',
      correctAnswer: model.right,
      domain: model.domain,
    };
  }

  if (fuzzy(JSON.stringify(answer), JSON.stringify(model.right)) >= 0.8) {
    return {
      result: 'partially-correct',
      correctAnswer: model.right,
      domain: model.domain,
    };
  }

  return {
    result: 'incorrect',
    correctAnswer: model.right,
    domain: model.domain,
  };
};

/**
 * If the answer array contains the same elements than the model.right array and if the order equals, than the answer is right.
 * @param {[string]} answer
 * @param {[string]} model
 * @returns {{result: 'correct' | 'incorrect'}}
 */
const sort = (answer, model) =>
  JSON.stringify(model.right) === JSON.stringify(answer)
    ? { result: 'correct', correctAnswer: model.right, domain: model.domain }
    : { result: 'incorrect', correctAnswer: model.right, domain: model.domain };

/**
 * If the answer with the key, value pair match the key value pair in the model.right, than the answer is right.
 * @param {[{key: string, value: string}]} answer
 * @param {[string]} model
 * @returns {{result: 'correct' | 'incorrect'}}
 */
const match = (answer, model) => {
  const rightAnswer = answer.filter((el) =>
    model.right.some(
      (rightElement) =>
        rightElement.key === el.key && rightElement.value === el.value
    )
  );

  return rightAnswer.length === model.right.length
    ? { result: 'correct', correctAnswer: model.right, domain: model.domain }
    : { result: 'incorrect', correctAnswer: model.right, domain: model.domain };
};

/**
 * Map the answers for the categorisation type.
 * @param {[{key: string, value: [string]}]} answer
 * @param {[string]} items contains all possible answers that the server send to the client before.
 * @param {*} model contains the result from the db call
 * @returns {{{result: 'correct' | 'incorrect', correctAnswer: []}}}
 */
const categoryType = (answer, model) => {
  let isCorrect = true;
  answer.forEach((category) => {
    model.right.forEach((result) => {
      if (category.key === result.key) {
        let isCalled = false;
        category.value.forEach((element) => {
          if (!result.value.includes(element) && !isCalled) {
            isCorrect = false;
            isCalled = true;
          }
        });
      }
    });
  });

  return isCorrect
    ? { result: 'correct', correctAnswer: model.right, domain: model.domain }
    : { result: 'incorrect', correctAnswer: model.right, domain: model.domain };
};

const mCQAnswerMapper = (msqArrayType, entry) => {
  const reverseMsqArrayType = msqArrayType === 'right' ? 'wrong' : 'right';
  let answers = [];
  let numOfFirstEntries = Math.floor(
    Math.random() * entry[msqArrayType].length
  );
  numOfFirstEntries =
    numOfFirstEntries >= 4 ? entry[msqArrayType].length % 4 : numOfFirstEntries;
  numOfFirstEntries =
    entry[reverseMsqArrayType].length === 3 ? 1 : numOfFirstEntries;
  while (answers.length < numOfFirstEntries) {
    const wrongElement =
      entry[msqArrayType][
        Math.floor(Math.random() * entry[msqArrayType].length)
      ];
    if (!answers.includes(wrongElement)) {
      answers.push(wrongElement);
      answers = lodash.shuffle(answers);
    }
  }
  while (answers.length < 4) {
    const rightElement =
      entry[reverseMsqArrayType][
        Math.floor(Math.random() * entry[reverseMsqArrayType].length)
      ];
    if (!answers.includes(rightElement)) {
      answers.push(rightElement);
      answers = lodash.shuffle(answers);
    }
  }
  return answers;
};

/** Create a response object. This object is send to the client and contains the question, possible answers (right and wrong answers), question id,
 * and the type (item type)
 * @param {[]} dbResult
 */
const mapResponseForQuestion = (dbResult, number) => {
  let result = [];
  if (number > dbResult) return [];
  dbResult.forEach((entry) => {
    let categories = [];
    let answers = [];

    if (entry.type === 'SCQ') {
      answers.push(entry.right[Math.floor(Math.random() * entry.right.length)]);

      while (answers.length < 4) {
        const wrongElement =
          entry.wrong[Math.floor(Math.random() * entry.wrong.length)];
        // The elements should not be twice in the array
        if (!answers.includes(wrongElement)) {
          answers.push(wrongElement);
        }
      }
      answers = lodash.shuffle(answers);
    }

    if (entry.type === 'MCQ') {
      if (entry.right.length === 2 && entry.wrong.length === 2) {
        answers = lodash.shuffle(
          answers.concat(entry.right).concat(entry.wrong)
        );
      } else if (entry.wrong.length < entry.right.length) {
        answers = mCQAnswerMapper('wrong', entry);
      } else {
        answers = mCQAnswerMapper('right', entry);
      }
    }

    if (entry.type === 'sort') {
      answers = lodash.shuffle(entry.right);
    }

    if (entry.type === 'match') {
      const keys = [];
      const items = lodash.shuffle(entry.right);
      let values = [];
      items.forEach((keyValuePair) => {
        keys.push(keyValuePair.key);
        values.push(keyValuePair.value);
      });
      values = lodash.shuffle(values);

      answers.push({ keys, values });
    }

    if (entry.type === 'FIB') {
      answers = [];
    }

    if (entry.type === 'category') {
      entry.right.forEach((category) => {
        answers = answers
          .concat(category.value)
          .sort(() => (Math.random() > 0.5 ? 1 : -1));
      });
      categories = entry.categories;
    }

    result.push({
      // eslint-disable-next-line no-underscore-dangle
      _id: entry._id,
      question: entry.question,
      type: entry.type,
      answers,
      categories,
    });
  });
  result = result.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return number ? result.slice(0, Number(number)) : result;
};

questionRoute
  .route('/')

  /**
   * Route for creating a new question
   */
  .post(async (req, res, next) => {
    logger.info('question.server post enter');

    const { question, right, wrong, type, domain } = req.body;

    if (!question || !question.replace(/\s/g, '').length) {
      logger.error(`No valid question was given. question: ${question}`);
      return next({ status: 400, message: 'No valid question was given' });
    }

    if (!right || right.length === 0) {
      logger.error(`A not valid right answer formart is given.`);
      return next({
        status: 400,
        message: 'A not valid right answer formart is given.',
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const rightAnswer in right) {
      if (!rightAnswer.replace(/\s/g, '').length) {
        logger.error(`Answer is empty or contains only white space`);
        return next({ status: 400, message: 'Only ACII is supported' });
      }
    }

    if (wrong && wrong.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const wrongAnswer in wrong) {
        if (!wrongAnswer.replace(/\s/g, '').length) {
          logger.error(`Wrong is empty or contains only white space`);
          return next({ status: 400, message: 'Only ACII is supported' });
        }
      }
    }

    try {
      const newQuestion = new QuestionModel({
        question,
        right,
        wrong: wrong ?? [],
        type,
        domain,
      });
      await newQuestion.save();
    } catch (error) {
      logger.error(
        `Something went wrong, when storing the question in the database.`
      );
      return next({ status: error.status, message: error.message });
    }

    logger.info('question.server post exit');
    return res.sendStatus(201);
  })

  /**
   * Route for send question to the client
   */
  .get(Auth.isAuth, async (req, res, next) => {
    logger.info('question.server get enter');
    const { domain, type, number } = req.query;

    const requestObj = {};

    if (domain) {
      requestObj.domain = domain;
    }

    if (type) {
      requestObj.type = type;
    }
    let questionModel;
    try {
      questionModel = await QuestionModel.find(requestObj);
    } catch (error) {
      logger.error(
        `Something went wrong, when reading the question from the database.`
      );
      return next({ status: error.status, message: error.message });
    }

    if (questionModel.length === 0) {
      logger.error(`A related question object was not found for this question`);
      return next({
        status: 404,
        message: 'A related question object was not found for this question',
      });
    }

    logger.info('question.server get exit');
    const data = mapResponseForQuestion(questionModel, number || null);
    return res.status(200).json(data);
  })
  .all((req, res, next) => {
    return next({ status: 405, message: 'Function not supported' });
  });

questionRoute
  .route('/:id')

  /**
   * Route for examine the answer
   * id := _id (The id of the stored database entry)
   */
  .post(Auth.isAuth, async (req, res, next) => {
    logger.info('question.server get:id enter');
    const { id } = req.params;
    const { answer, items } = req.body;

    let questionModel;

    if (!answer || !answer.length || answer.length === 0) {
      logger.error('No answer was given');
      return next({ status: 404, message: 'No answer was given' });
    }

    try {
      questionModel = await QuestionModel.findById(id);
    } catch (error) {
      logger.error('No related question was found');
      return next({ status: 405, message: 'No related question was found' });
    }

    let result = {};

    if (questionModel.type === 'MCQ' && items && items.length > 0) {
      result = XChoice(answer, items, questionModel);
    }

    if (questionModel.type === 'SCQ' && answer.length === 1) {
      result = XChoice(answer, questionModel.right, questionModel);
    }

    if (questionModel.type === 'sort') {
      result = sort(answer, questionModel);
    }

    if (questionModel.type === 'FIB') {
      result = fillInBlank(answer, questionModel);
    }

    if (questionModel.type === 'match') {
      result = match(answer, questionModel);
    }
    if (questionModel.type === 'category') {
      result = categoryType(answer, questionModel);
    }

    if (!result.result) {
      logger.error('No correct answer was given');
      logger.info('question.server get:id exit');
      return next({ status: 404, message: 'No valid answer format was given' });
    }

    logger.info('send answer result to client');
    logger.info('question.server get:id exit');
    return res.status(200).json(result);
  })
  .all((req, res, next) => {
    return next({ status: 405, message: 'Function not supported' });
  });

module.exports = questionRoute;
