
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Organization = require('../../models/Organization');
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

//@route  GET api/organizations
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Organizations Router'));


//@route  GET api/organizations
//@desc   Test route
//@access Public
router.post('/organizationRegister', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
    check('address', 'Address  is required').not().isEmpty(),
    check('organizationName', 'Organization Name  is required').not().isEmpty(),
    check('isOrg', 'isOrg or not specification is  required & of Type Boolean').not().isEmpty().isBoolean()


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, address, organizationName, isOrg } = req.body;
    try {
        let organization = await Organization.findOne({ email });

        if (organization) {
            res.status(400).json({ errors: [{ msg: 'organization already exists' }] })
        }
        else {
            // get gravatar 
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            organization = new Organization({
                name, email, avatar, password, address, organizationName, isOrg
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);

            organization.password = await bcrypt.hash(password, salt);


            await organization.save();
            // Anything that returns a promise should have await for sync

            //return jsonwebtoken Payload

            const payload = {
                organization: {
                    id: organization.id // default abstraction for id 
                }
            };

            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );



            // res.send('Organization Registered')
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});


//@route  POST api/organizations/
//@desc   Login Authenticate organization & get token
//@access Public
router.post('/organizationLogin', [
    // check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
    // check('address', 'Address  is required').not().isEmpty(),
    // check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    check('isOrg', 'isOrg or not specification is  required & of Type Boolean').not().isEmpty().isBoolean()


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, isOrg } = req.body;
    try {
        if (isOrg) {
            let organization = await Organization.findOne({ email });

            if (!organization) {
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });
            }
            else {

                const isMatch = await bcrypt.compare(password, organization.password);

                if (!isMatch) {
                    res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });
                }
                else {
                    //return jsonwebtoken Payload

                    const payload = {
                        organization: {
                            id: organization.id // default abstraction for id 
                        }
                    };

                    jwt.sign(payload, config.get('jwtSecret'),
                        { expiresIn: 360000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        }
                    );



                    // res.send('organization Login')

                }
            }
        }
        else {
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });

        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});


module.exports = router;