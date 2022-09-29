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

/**
 * UpdateRole
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

                role.save(function(err, UpdateRole)
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
                        const userRoleAlreadyInUseResponse = new BaseResponse(400, `Role ${role.text} is in use.`, role);
                        res.status(400).send(userRoleAlreadyInUseResponse.toObject());
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
