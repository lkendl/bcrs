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
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

let userSchema = new Schema({
  userName:                   { type: String, required: true, unique: true },
  password:                   { type: String, required: true },
  firstName:                  { type: String },
  lastName:                   { type: String },
  phoneNumber:                { type: String },
  address:                    { type: String },
  email:                      { type: String },
  isDisabled:                 { type: Boolean, default: false },
  role:                       UserRoleSchema,
  selectedSecurityQuestions:  [SelectedSecurityQuestionSchema],
  dateCreated:                { type: Date, default: new Date() },
  dateModified:               { type: Date }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
