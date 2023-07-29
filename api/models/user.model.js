/**
 * @author Dominik Liesfeld
 * @version 1.0
 *
 * This file contains the user
 */

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema;

const user = new UserSchema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        questionId: mongoose.Types.ObjectId,
        numRightAnswer: { type: Number, default: 0 },
        numWrongAnswer: { type: Number, default: 0 },
        time: { type: Number, default: 0 },
        domain: String,
        dbType: String,
      },
    ],
    default: [],
  },
});
module.exports = mongoose.model('User', user);
