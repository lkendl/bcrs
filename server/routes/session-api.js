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
const saltRounds = 10; // default salt rounds for hashing algorithm

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

                    let isDisabled = user.isDisabled;
                    console.log('isDisabled below:');
                    console.log(isDisabled);
                    /**
                     * if password is valid
                     */
                    if (passwordIsValid && !isDisabled)
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
 * register
 * @openapi
 * /api/session/register:
 *  post:
 *    tags:
 *      - Session
 *    description: API for registering new user
 *    summary: Registers new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            description: User's information
 *            required:
 *              - userName
 *              - password
 *              - firstName
 *              - lastName
 *              - phoneNumber
 *              - address
 *              - email
 *              - role
 *              - selectedSecurityQuestions
 *            properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              address:
 *                type: string
 *              email:
 *                type: string
 *              selectedSecurityQuestions:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    questionText:
 *                      type: string
 *                    answerText:
 *                      type: string
 *                example:
 *                  - questionText: string
 *                    answerText: string
 *                  - questionText: string
 *                    answerText: string
 *                  - questionText: string
 *                    answerText: string
 *    responses:
 *      "200":
 *        description: Query successful
 *      "400":
 *        description: Invalid username
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
 */
router.post('/register', async(req, res) => {
  try
  {
    User.findOne({'userName': req.body.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      }
      else
      {
        if (!user)
        {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
          standardRole = {
            text: 'standard'
          }

          // User object
          let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions
          };

          User.create(registeredUser, function (err, newUser)
          {
            if (err)
            {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            }
            else
            {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
              res.json(registeredUserResponse.toObject());
            }
          })
        }
        else
        {
          console.log(`Username '${req.body.userName}' already exists.`);
          const userInUseError = new BaseResponse('400', `The username '${req.body.userName}' is already in use.`, null);
          res.status(500).send(userInUseError.toObject());
        }
      }
    })
  } catch (e)
  {
    console.log(e)
    const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

/**
 * VerifyUser
 */
/**
 * verifyUser
 * @openapi
 * /api/session/verify/users/{userName}:
 *  get:
 *    tags:
 *      - Session
 *    description: API for verifying username
 *    summary: Verifies user and returns user document
 *    parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        description: The username requested by user
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Query successful
 *      "400":
 *        description: Invalid username
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
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
 **/
/**
 * verifySecurityQuestions
 * @openapi
 * /api/session/verify/users/{userName}/security-questions:
 *  post:
 *    tags:
 *      - Session
 *    description: API for comparing users entered security question answers against what's saved in user document
 *    summary: Verifies user's security question answers
 *    parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        description: The username requested by user
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - questionText1
 *              - questionText2
 *              - questionText3
 *              - answerText1
 *              - answerText2
 *              - answerText3
 *            properties:
 *              questionText1:
 *                type: string
 *              questionText2:
 *                type: string
 *              questionText3:
 *                type: string
 *              answerText1:
 *                type: string
 *              answerText2:
 *                type: string
 *              answerText3:
 *                type: string
 *    responses:
 *      "200":
 *        description: Query successful
 *      "400":
 *        description: Invalid username
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
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
                const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionText1);
                const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
                const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

                // console.log(selectedSecurityQuestionOne);
                // console.log(selectedSecurityQuestionTwo);
                // console.log(selectedSecurityQuestionThree);

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
/**
 * resetPassword
 * @openapi
 * /api/session/users/{userName}/reset-password:
 *   post:
 *     tags:
 *       - Session
 *     name: resetPassword
 *     description: API to reset a user password
 *     summary: Resets a password
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/users/:userName/reset-password', async(req, res) => {
    try
    {
        const password = req.body.password;

        User.findOne({'userName': req.params.userName}, function(err, user)
        {
            if (err)
            {
                console.log(err);
                const resetPasswordMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                let hashedPassword = bcrypt.hashSync(password, saltRounds); // salt/hash the password

                user.set({
                    password: hashedPassword
                });

                user.save(function(err, updatedUser)
                {
                    if (err)
                    {
                        console.log(err);
                        const updatedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(updatedUserMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(updatedUser);
                        const updatedPasswordResponse = new BaseResponse(200, 'Query successful', updatedUser);
                        res.json(updatedPasswordResponse.toObject());
                    }
                })
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const resetPasswordCatchError = new ErrorResponse(500, 'Internal server error', e);
        res.status(500).send(resetPasswordCatchError.toObject());
    }
});

module.exports = router;
