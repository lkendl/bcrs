const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let securityQuestionsSchema = new Schema({
  text: { type: String },
  isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

module.exports = mongoose.model('SecurityQuestions', securityQuestionsSchema);
