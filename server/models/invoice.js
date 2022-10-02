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

const lineItemDocument = require('../schemas/line-item');

const invoiceSchema = new Schema ({
  userName:         { type: String },
  lineItems:        [lineItemDocument],
  partsAmount:      { type: Number },
  laborAmount:      { type: Number },
  lineItemTotal:    { type: Number },
  total:            { type: Number },
  orderDate:        { type: Date, default: new Date() }
}, { collection: 'invoices' });

module.exports = mongoose.model('Invoice', invoiceSchema);
