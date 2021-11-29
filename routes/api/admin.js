const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Admin = require('../../models/Admin');
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
//@route  GET api/admin
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Admin Router'));

//@route  GET api/admin
//@desc   Test route
//@access Public
router.post('/adminRegister', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
    check('address', 'Address  is required').not().isEmpty(),
    check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    check('adminAccess', 'isOrg or not specification is  required & of Type Boolean').not().isEmpty().isBoolean()


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, address, bloodGroup, adminAccess } = req.body;
    try {
        let admin = await Admin.findOne({ email });

        if (admin) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        else {
            // get gravatar 
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            admin = new Admin({
                name, email, avatar, password, address, bloodGroup, adminAccess
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);

            admin.password = await bcrypt.hash(password, salt);


            await admin.save();
            // Anything that returns a promise should have await for sync

            //return jsonwebtoken Payload

            const payload = {
                admin: {
                    id: admin.id // default abstraction for id 
                }
            };

            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );



            // res.send('admin Registered')
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});


//@route  POST api/admin/
//@desc   Login Authenticate user & get token
//@access Public
router.post('/adminLogin', [
    // check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
    // check('address', 'Address  is required').not().isEmpty(),
    // check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    check('adminAccess', 'Admin access is required & of Type Boolean').not().isEmpty().isBoolean()


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, adminAccess } = req.body;
    try {
        // if (!isOrg) {
        let admin = await Admin.findOne({ email });

        if (!admin) {
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });
        }
        else {

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });
            }
            else {
                //return jsonwebtoken Payload

                const payload = {
                    admin: {
                        id: admin.id // default abstraction for id 
                    }
                };

                jwt.sign(payload, config.get('jwtSecret'),
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );



                // res.send('Admin Login')

            }
        }
        // }
        // else {
        //     res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });

        // }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});



module.exports = router;