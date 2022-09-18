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

// require statements
const express = require('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../models/error-response')
const BaseResponse = require('../models/base-response');

// configurations
const router = express.Router();

/**
 * FindAll
 */
/**
 * findAll
 * @openapi
 * /api/security-questions:
 *   get:
 *     tags:
 *       - Security Questions
 *     description: API for returning an array of security questions from MongoDB Atlas.
 *     summary: Returns an array of security questions
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/', async(req, res) => {
    try
    {
        SecurityQuestion.find({})
          .where('isDisabled')
          .equals(false)
          .exec(function(err, securityQuestions)
        {
            if (err)
            {
                console.log(err);
                const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findAllMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(securityQuestions);
                const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions);
                res.json(findAllResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllCatchErrorResponse.toObject());
    }
});

/**
 * FindById
 */
/**
 * findById
 * @openapi
 * /api/security-questions/{id}:
 *  get:
 *    tags:
 *      - Security Questions
 *    description: API for returning a single security question object from MongoDB
 *    summary: Returns a security question document
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The security question id requested by user
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Query successful
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
 */
router.get('/:id', async(req, res) => {
    try
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
            if (err)
            {
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(securityQuestion);
                const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
                res.json(findByIdResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
});

/**
 * CreateSecurityQuestion
 */
/**
 * createSecurityQuestion
 * @openapi
 * /api/security-questions:
 *   post:
 *     tags:
 *       - Security Questions
 *     description: API to create new security question objects
 *     summary: Creates a new security question object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - text
 *             properties:
 *              text:
 *                type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/', async(req,res) => {
    try
    {
        let newSecurityQuestion = {
            text: req.body.text
        };

        SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
            if (err)
            {
                console.log(err);
                const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
            }
            else
            {
              console.log(securityQuestion);
              const createSecurityQuestionResponse = new BaseResponse(200, 'Query successful', securityQuestion);
              res.json(createSecurityQuestionResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
    }
});

/**
 * UpdateSecurityQuestions
 */
/**
 * updateSecurityQuestions
 * @openapi
 * /api/security-questions/{id}:
 *   put:
 *     tags:
 *       - Security Questions
 *     description: API to update security question objects
 *     summary: Updates a security question object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The security question's id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - text
 *             properties:
 *              text:
 *                description: Security question input
 *                type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.put('/:id', async(req,res) => {
    try
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
          if (err)
          {
              console.log(err);
              const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject())
          }
          else
          {
              console.log(securityQuestion);

              securityQuestion.set({
                  text: req.body.text
              });

              securityQuestion.save(function(err, savedSecurityQuestion) {
                  if (err)
                  {
                      console.log(err);
                      const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                      res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                  }
                  else
                  {
                      console.log(savedSecurityQuestion);
                      const updateSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                      res.json(updateSecurityQuestionResponse.toObject());
                  }
              })
          }
        })
    }
    catch (e)
    {
        console.log(e);
        const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
    }
});

/**
 * DeleteSecurityQuestions
 */
/**
 * deleteSecurityQuestions
 * @openapi
 * /api/security-questions/{id}:
 *   delete:
 *     tags:
 *       - Security Questions
 *     description: API to delete security question objects
 *     summary: Deletes a new security question object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The security question's id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/:id', async (req, res) => {
    try
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
            if (err)
            {
                console.log(err);
                const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(securityQuestion);

                securityQuestion.set({
                  isDisabled: true
                });

                securityQuestion.save(function (err, savedSecurityQuestion) {
                    if (err)
                    {
                        console.log(err);
                        const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(savedSecurityQuestion);
                        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                        res.json(deleteSecurityQuestionResponse.toObject());
                    }
                })
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
    }
});

module.exports = router;
