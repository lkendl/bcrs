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
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const BaseResponse = require('../models/base-response');
const ErrorResponse = require('../models/error-response');

// configurations
const router = express.Router();

/**
 * User sign-in
 */
/**
 * signin
 * @openapi
 * /api/session/signin:
 *   post:
 *     tags:
 *       - Session
 *     description: API to signin user
 *     summary: Signin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username and/or password, please try again
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signin', async(req, res) => {
    try
    {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err)
            {
                console.log(err);
                const signinMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(signinMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                /**
                 * if username is valid
                 */
                if (user)
                {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compare the saved hashed password against the sign-in password

                    /**
                     * if password is valid
                     */
                    if (passwordIsValid)
                    {
                        console.log(`Login successful`);
                        const signinResponse = new BaseResponse(200, 'Login successful', user);
                        res.json(signinResponse.toObject());
                    }
                    /**
                     * if password is NOT valid
                     */
                    else
                    {
                        console.log(`Invalid password for username: ${user.userName}`);
                        const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                        res.status(401).send(invalidPasswordResponse.toObject());
                    }
                }
                /**
                 * if the username is NOT valid
                 */
                else
                {
                    console.log(`Username: ${req.body.userName} is invalid`);
                    const invalidUsernameResponse = new BaseResponse(200, 'Invalid username and/or password, please try again', null);
                    res.status(401).send(invalidUsernameResponse.toObject());
                }
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

/**
 * Register
 */

/**
 * VerifyUser
 */
router.get('/verify/users/:userName', async (req, res) => {
  try
  {
      User.findOne({'userName': req.params.userName}, function(err, user)
      {
          if (user)
          {
              if (err)
              {
                  console.log(err);
                  const verifyUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                  res.status(500).send(verifyUserMongodbErrorResponse.toObject());
              }
              else
              {
                  console.log(user);
                  const verifyUserResponse = new BaseResponse(200, 'Query successful', user);
                  res.json(verifyUserResponse.toObject());
              }
          }
              else
              {
                  const invalidUsernameResponse = new BaseResponse(400, 'Invalid username', req.params.userName);
                  res.status(400).send(invalidUsernameResponse.toObject());
              }
      })
  }
  catch (e)
  {
      console.log(e);
      const verifyUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/**
 * VerifySecurityQuestions
 */
router.post('/verify/users/:userName/security-questions', async(req, res) => {
    try
    {
        User.findOne({'userName': req.params.userName}, function(err, user) {
            if (err)
            {
                console.log(err);
                const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionsText1);
                const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
                const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

                const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
                const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
                const isValidAnswerThree = selectedSecurityQuestionThree.answerText = req.body.answerText3;

                if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree)
                {
                    console.log(`User ${user.userName} answered their security questions correctly`);
                    const validSecurityQuestionsResponse = new BaseResponse(200, 'Success', user);
                    res.json(validSecurityQuestionsResponse.toObject());
                }
                else
                {
                    console.log(`User ${user.userName} did not answer their security questions correctly`);
                    const invalidSecurityQuestionsResponse = new BaseResponse(200, 'Error', user);
                    res.json(invalidSecurityQuestionsResponse.toObject());
                }
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
    }
});

/**
 * ResetPassword
 */

module.exports = router;
