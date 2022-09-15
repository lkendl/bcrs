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
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

// configurations
const router = express.Router();

/**
 * FindAll
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
router.get('/:id', async(req, res) => {
    try
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, SecurityQuestion) {
            if (err)
            {
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(SecurityQuestion);
                const findByIdResponse = new BaseResponse(200, 'Query successful', SecurityQuestion);
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
router.post('/', async(req,res) => {
    try
    {
        let newSecurityQuestion = {
            text: req.body.text
        };

        SecurityQuestion.create(newSecurityQuestion, function(err, SecurityQuestion) {
            if (err)
            {
                console.log(err);
                const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
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
 * UpdateSecurityQuestion
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
              console.log(securityQuestions);

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
 * DeleteSecurityQuestion
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
