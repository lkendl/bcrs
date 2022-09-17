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
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const RoleSchema = require('../schemas/user-role');

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
 *    summary: Returns an user document
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
            role: 'standard'
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
                    email: req.body.email
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

module.exports = router;
