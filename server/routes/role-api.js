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

// Require statements
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../models/error-response');
const BaseResponse = require('../models/base-response');

const router = express.Router();

/**
 * FindAll
 */
/**
 * findAll
 * @openapi
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     description: API for returning an array of roles objects from MongoDB Atlas.
 *     summary: Returns an array of roles in JSON format
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
        Role.find({})
        .where('isDisabled')
        .equals(false)
        .exec(function(err, roles)
        {
          if (err)
          {
              console.log(err);
              const findAllRolesMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
          }
          else
          {
              console.log(roles);
              const findAllRolesResponse = new BaseResponse(200, 'Query successful', roles);
              res.json(findAllRolesResponse.toObject());
          }
      })
    }
    catch (e)
    {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllRolesCatchErrorResponse.toObject());
    }
});

/**
 * FindById
 */
/**
 * findById
 * @openapi
 * /api/roles/{roleId}:
 *  get:
 *    tags:
 *      - Roles
 *    description: API for returning a single role object from MongoDB.
 *    summary: Returns a role document
 *    parameters:
 *      - name: roleId
 *        in: path
 *        required: true
 *        description: The roleId requested by user
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
 router.get('/:roleId', async(req, res) => {
  try
  {
      Role.findOne({'_id': req.params.roleId}, function(err, role)
      {
        if (err)
        {
            console.log(err);
            const findRoleByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
        }
        else
        {
            console.log(role);
            const findRoleByIdResponse = new BaseResponse(200, 'Query successful', role);
            res.json(findRoleByIdResponse.toObject());
        }
    })
  }
  catch (e)
  {
      console.log(e);
      const findRoleByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

/**
 * CreateRole
 */
/**
 * createRole
 * @openapi
 * /api/roles:
 *   post:
 *     tags:
 *       - Roles
 *     description: API to create new role objects.
 *     summary: Creates a new role object
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
 router.post('/', async(req, res) => {
  try
  {
      Role.findOne({'text': req.body.text}, function(err, role) {
          if (err) {
              console.log(err);
              const findRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(findRoleMongodbErrorResponse.toObject());
          } else {
              console.log(role);

              if (!role) {

                const newRole = {
                  text: req.body.text
                }

                Role.create(newRole, function(err, role)
                {
                  if (err)
                  {
                    console.log(err);
                    const createRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                    res.status(500).send(createRoleMongodbErrorResponse.toObject());
                  }
                  else
                  {
                    console.log(role);
                    const createRoleResponse = new BaseResponse(200, 'Query successful', role);
                    res.json(createRoleResponse.toObject());
                  }
                })
              } else {
                console.log(`Role: ${req.body.text} already exists`);
                const roleAlreadyExists = new ErrorResponse(200, `Role '${req.body.text}' already exists. If you do not see the role in the list then it means it was disabled`, null);
                res.status(200).send(roleAlreadyExists.toObject());
              }
          }
      })
  }
  catch (e)
  {
      console.log(e);
      const createRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});

/**
 * UpdateRole
 */
/**
 * updateRole
 * @openapi
 * /api/roles/{roleId}:
 *   put:
 *     tags:
 *       - Roles
 *     description: API to update role object
 *     summary: Updates a role object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's roleId
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
 *                type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
 router.put('/:roleId', async(req, res) => {
  try
  {
      Role.findOne({'_id': req.params.roleId}, function(err, role)
      {
          if (err)
          {
              console.log(err);
              const updateRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(updateRoleMongodbErrorResponse.toObject());
          }
          else
          {
              console.log(role);

              role.set({
                  text: req.body.text
              });

              role.save(function(err, updatedRole)
              {
                  if (err)
                  {
                      console.log(err);
                      const updatedRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                      res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                  }
                  else
                  {
                      console.log(updatedRole);
                      const updatedRoleResponse = new BaseResponse(200, 'Query successful', updatedRole);
                      res.json(updatedRoleResponse.toObject());
                  }
              })
          }
      })
  }
  catch (e)
  {
      console.log(e);
      const updateRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(updateRoleCatchErrorResponse.toObject());
  }
});

/**
* DeleteRole
*/
/**
 * deleteRole
 * @openapi
 * /api/roles/{roleId}:
 *   delete:
 *     tags:
 *       - Roles
 *     description: API to delete role objects
 *     summary: Deletes a role object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's roleId
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
router.delete('/:roleId', async (req, res) => {
  try
  {
      /**
       * Find the role by document id
       */
      Role.findOne({'_id': req.params.roleId}, function(err, role)
      {
          if (err)
          {
              console.log(err);
              const deleteRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
          }
          else
          {
              console.log(role);

              /**
               * Aggregate query to determine if the role being deleted is already mapped to an existing user
               */
              User.aggregate(
                [
                  {
                    $lookup:
                      {
                        from: 'roles',
                        localField: 'role.text', // may be role.role
                        foreignField: 'text',
                        as: 'userRoles'
                      }
                  },
                  {
                    $match:
                      {
                        'userRoles.text': role.text
                      }
                  }
                ], function(err, users)
                {
                  console.log(users);
                  if (err)
                  {
                    console.log(err);
                    const usersMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                    res.status(500).send(usersMongodbErrorResponse.toObject());
                  }
                  else
                  {
                    /**
                     * If the query returns one or more users, then the role is already in use and shouldn't be disabled
                     */
                    if (users.length > 0)
                    {
                      console.log(`Role <${role.text}> is already in use and cannot be deleted`);
                      const userRoleAlreadyInUseResponse = new BaseResponse(201, `Role ${role.text} is in use.`, role);
                      res.status(201).send(userRoleAlreadyInUseResponse.toObject());
                    }
                    else
                    {
                      /**
                       * Otherwise, the role requesting to be disabled is not in use and can be safely removed
                       */
                      console.log(`Role <${role.text} is not an activate role and can be safely removed`);

                      role.set({
                        isDisabled: true
                      });

                      role.save(function(err, updatedRole)
                      {
                        if (err)
                        {
                          console.log(err);
                          const updatedRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                          res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                        }
                        else
                        {
                          console.log(updatedRole);
                          const roleDeletedResponse = new BaseResponse(200, `Role ${role.text} has been removed successfully`, updatedRole);
                          res.json(roleDeletedResponse.toObject());
                        }
                      })
                    }
                  }
                }
              )
          }
      })
  }
  catch (e)
  {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;
