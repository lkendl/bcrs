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

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Routes
 */
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const SecurityQuestionApi = require('./routes/security-question-api');
const RoleApi = require('./routes/role-api');
const InvoiceApi = require('./routes/invoice-api');

/**
 * Swagger
 */
const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Nodebucket',
          version: '1.0.0',
      },
  },
  apis: ['./server/routes/*.js'], // files containing annotations for the OpenAPI Specification
};
const openapiSpecification = swaggerJsdoc(options);

/**
 * App configurations.
 */
let app = express();
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const PORT = process.env.PORT || 3000; // server port

// MongoDB connection
const CONN = 'mongodb+srv://bcrs_user:s3cret@buwebdev-cluster-1.ixkw5.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});

mongoose.connect(CONN, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * APIs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/security-questions', SecurityQuestionApi);
app.use('/api/roles', RoleApi);
app.use('/api/invoices', InvoiceApi);

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
