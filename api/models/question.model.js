/**
 * @author Dominik Liesfeld
 * @version 1.0
 *
 * This file contains the question model.
 * The model contains three attributes question, true, false.
 * question := def. the question.
 * right := contains all valid answers
 * wrong := contains all wrong or incorrect answers.
 */

const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema;

const question = new QuestionSchema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  right: {
    type: [],
    required: true,
  },
  wrong: {
    type: [String],
  },
  type: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    require: true,
  },
  gap: {
    type: [String],
  },
  categories: {
    type: [String],
  },
});
module.exports = mongoose.model('Question', question);
