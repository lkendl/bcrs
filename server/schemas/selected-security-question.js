const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let selectedSecurityQuestionSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String }
})

module.exports = selectedSecurityQuestionSchema;
