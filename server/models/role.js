/*
============================================
; Title: bcrs
; Author: Professor Krasso
; Date: 28 September 2022
; Modified By: Seth Kerrey, Laura Kendl
; Description: The Bob's Computer Repair Shop (BCRS) application calculates
; service repair fees, generates invoices, and tracks purchases by service.
===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  text:         { type: String, unique: true },
  isDisabled:   { type: Boolean, default: false }
}, { collection: 'roles' });

module.exports = mongoose.model('Role', roleSchema);
