const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
  role: { type: String, default: 'standard' }
})

module.exports = userRoleSchema;
