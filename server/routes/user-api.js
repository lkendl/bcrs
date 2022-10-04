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
 * FindAll
 */
/**
 * findAll
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: API for returning an array of users from MongoDB Atlas.
 *     summary: Returns an array of users
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/', async (req, res) => {
    try
    {
        User.find({})
          .where('isDisabled')
          .equals(false)
          .exec(function(err, users)
          {
              if (err)
              {
                  console.log(err);
                  const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                  res.status(500).send(findAllMongodbErrorResponse.toObject());
              }
              else
              {
                  console.log(users);
                  const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
                  res.json(findAllUsersResponse.toObject());
              }
          })
    }
    catch (e)
    {
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
 * /api/users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    description: API for returning a single user object from MongoDB
 *    summary: Returns a user document
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The user id requested by user
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
        User.findOne({'_id': req.params.id}, function(err, user) {
            if (err)
            {
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);
                const findByIdResponse = new BaseResponse(200, 'Query successful', user);
                res.json(findByIdResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e);
        res.status(500).send(findByIdCatchErrorResponse.toObject());;
    }
});

/**
 * CreateUser
 */
/**
 * createUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: API to create new user objects
 *     summary: Creates a new user object
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
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/', async(req, res) => {
    try
    {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
        standardRole = {
            text: 'standard'
        }

        // user object
        let newUser = {
          userName: req.body.userName,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          role: standardRole
        };

        User.create(newUser, function(err, user) {
            if (err)
            {
                console.log(err);
                const createUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(createUserMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);
                const createUserResponse = new BaseResponse(200, 'Query successful', user);
                res.json(createUserResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createUserCatchErrorResponse.toObject());
    }
});

/**
 * UpdateUser
 */
/**
 * updateUser
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: API to update user objects
 *     summary: Updates a user object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - email
 *               - role
 *             properties:
 *              firstName:
 *                description: User's first name
 *                type: string
 *              lastName:
 *                description: User's last name
 *                type: string
 *              phoneNumber:
 *                description: User's phone number
 *                type: number
 *              address:
 *                description: User's mailing address
 *                type: string
 *              email:
 *                description: User's email address
 *                type: string
 *              role:
 *                type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.put('/:id', async (req, res) => {
    try {
        User.findOne({'_id': req.params.id}, function(err, user) {
            if (err)
            {
              console.log(err);
              const updateUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(updateUserMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                user.set({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    email: req.body.email,
                    'role.text': req.body.role
                })

                user.save(function(err, savedUser) {
                    if (err)
                    {
                        console.log(err);
                        const saveUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(saveUserMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(savedUser);
                        const saveUserResponse = new BaseResponse(200, 'Query successful', savedUser);
                        res.json(saveUserResponse.toObject());
                    }
                })
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(updateUserCatchErrorResponse.toObject());
    }
});

/**
 * DeleteUser
 */
/**
 * deleteUser
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: API to delete user objects
 *     summary: Deletes a user object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's id
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
        User.findOne({'_id': req.params.id}, function(err, user) {
            if (err)
            {
                console.log(err);
                const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteUserMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                user.set({
                    isDisabled: true
                });

                user.save(function(err, savedUser) {
                    if (err)
                    {
                        console.log(err);
                        const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.json(savedUserMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(savedUser);
                        const savedUserResponse = new BaseResponse(200, 'Query successful', savedUser);
                        res.json(savedUserResponse.toObject());
                    }
                })
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteUserCatchErrorResponse.toObject());
    }
});

/**
 * FindSelectedSecurityQuestions
 */
/**
 * findSelectedSecurityQuestions
 * @openapi
 * /api/users/{userName}/security-questions:
 *  get:
 *    tags:
 *      - Users
 *    description: API for return security questions for user
 *    summary: Finds registered security question for user
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
router.get('/:userName/security-questions', async(req, res) => {
    try
    {
        User.findOne({'userName': req.params.userName}, function(err, user){
            if (err)
            {
                console.log(err);
                const findSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findSelectedSecurityQuestionsMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);
                const findSelectedSecurityQuestionsResponse = new BaseResponse(200, 'Query successful', user.selectedSecurityQuestions);
                res.json(findSelectedSecurityQuestionsResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
    }
});

/**
 * FindUserRole
 */
/**
 * findUserRole
 * @openapi
 * /api/users/{userName}/role:
 *  get:
 *    tags:
 *      - Users
 *    description: API for returning a single user role object from MongoDB
 *    summary: Returns a user role document
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
 *      "500":
 *        description: Internal server error
 *      "501":
 *        description: MongoDB Exception
 */
 router.get('/:userName/role', async(req, res) => {
  try
  {
      User.findOne({'userName': req.params.userName}, 'role.text', function(err, user) {
          if (err)
          {
              console.log(err);
              const findUserRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(findUserRoleMongodbErrorResponse.toObject());
          }
          else
          {
              console.log(user);
              const findUserRoleResponse = new BaseResponse(200, 'Query successful', user);
              res.json(findUserRoleResponse.toObject());
          }
      })
  }
  catch (e)
  {
      console.log(e);
      const findUserRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e);
      res.status(500).send(findUserRoleCatchErrorResponse.toObject());;
  }
});

module.exports = router;
