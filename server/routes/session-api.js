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

// configurations
const router = express.Router();

/**
 * User sign-in
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
                    const invalidUserNameResponse = new BaseResponse(200, 'Invalid username and/or password, please try again', null);
                    res.status(401).send(invalidUserNameResponse.toObject());
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

module.exports = router;
