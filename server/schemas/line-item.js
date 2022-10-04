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

const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number }
})

module.exports = lineItemSchema;
