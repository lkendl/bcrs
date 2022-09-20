/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 14 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let securityQuestionSchema = new Schema({
  text: { type: String },
  isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
