const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
var timediff = require('timediff');

const auth = require('../../middleware/auth')


const User = require('../../models/User');
const Appointment = require('../../models/Appointment');
const Store = require('../../models/Store');
const MyReq = require('../../models/MyReq');

const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config');
const { request } = require('express');

//@route  GET api/users
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Users Router'));


//@route  Post api/users/userRegister
//@desc   Test route
//@access Public
router.post('/userRegister', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
    check('location', 'location  is required').not().isEmpty(),
    check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    check('userType', 'User Type should be mentioned').not().isEmpty(),
    check('adminAccess', 'Access Type should be mentioned').not().isEmpty().isBoolean(),
    check('organizationName', 'organization Name should be mentioned').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password, location, bloodGroup, userType, adminAccess, organizationName } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        else {
            // get gravatar 
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            if ((userType == "USER") || (userType == "ORG" || userType == "ADMIN")) {
                user = new User({
                    name, email, avatar, password, location, bloodGroup, userType, adminAccess, organizationName
                });

                //Encrypt password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await user.save();
                // Anything that returns a promise should have await for sync
                //return jsonwebtoken Payload

                const payload = {
                    user: {
                        id: user.id // default abstraction for id 
                    }
                };
                jwt.sign(payload, config.get('jwtSecret'),
                    { expiresIn: '720d' },//360000
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );

            }
            // res.send('User Registered')
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


//@route  POST api/users/userLogin
//@desc   Login Authenticate user & get token
//@access Public
router.post('/userLogin', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
    check('userType', 'User Type  is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password, userType } = req.body;
    try {
        if ((userType == "USER") || (userType == "ORG" || userType == "ADMIN")) {
            let user = await User.findOne({ email });
            if (!user || (user.userType != userType)) {
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });
            }
            else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(400).json({ errors: [{ msg: 'Invalid Credentials ' }] });
                }
                else {
                    //return jsonwebtoken Payload

                    const payload = {
                        user: {
                            id: user.id // default abstraction for id 
                        }
                    };
                    jwt.sign(payload, config.get('jwtSecret'),
                        { expiresIn: '720d' },//360000
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        }
                    );
                    // res.send('User Login')
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




// //@route  post api/users
// //@desc   Test route
// //@access Public
// router.post('/userProfileUpdate', [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Please enter a password with 6 or more charaters').isLength({ min: 6 }),
//     check('address', 'Address  is required').not().isEmpty(),
//     check('bloodGroup', 'Blood group  is required').not().isEmpty(),
//     check('isOrg', 'isOrg or not specification is  required & of Type Boolean').not().isEmpty().isBoolean()


// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         // console.log(errors.mapped())
//         return res.status(400).json({ errors: errors.array() })
//     }

//     const { name, email, password, address, bloodGroup, isOrg } = req.body;
//     try {
//         let user = await User.findOne({ email });

//         if (user) {



//             //Encrypt password
//             const salt = await bcrypt.genSalt(10);

//             user.password = await bcrypt.hash(password, salt);

//             user = await User.findOneAndUpdate({ id: user.id }, { $set: { name: name, password: user.password, address: address, bloodGroup: bloodGroup, isOrg: isOrg } }, { new: true });


//             // return res.json(user);

//             // await user.save();
//             // Anything that returns a promise should have await for sync

//             //return jsonwebtoken Payload

//             const payload = {
//                 user: {
//                     id: user.id // default abstraction for id 
//                 }
//             };

//             jwt.sign(payload, config.get('jwtSecret'),
//                 { expiresIn: 360000 },
//                 (err, token) => {
//                     if (err) throw err;
//                     res.json({ token });
//                 }
//             );



//             // res.send('User Updated')
//         }

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error')
//     }


// });



//@route  post api/users/donor/getAppointmentslog
//@desc   Test route
//@access Public

router.post('/donor/getAppointmentslog', auth,
    [
        // check('location', 'location is  required').not().isEmpty(),
        // check('donationDate', 'donationDate  is required').not().isEmpty(),
        // check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    ],
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     // console.log(errors.mapped())
        //     return res.status(400).json({ errors: errors.array() })
        // } 
        // const { location, donationDate, bloodGroup } = req.body;
        const user = await User.findById(req.user.id);

        try {
            let appointmentsLog = await Appointment.find({ createdByUser: user.id }).populate({ path: 'createdByUser', select: 'name email' }).sort('-createdDate');
            // let store = await Store.findOne({ location });
            // donationSlots = store.donationSlots;

            // var datetime = new Date();
            // let donationDate = datetime.toISOString().slice(0, 10);
            // console.log(donationDate);
            // let appointmentSlots = await Appointment.find({ donationDate });
            // let remainingAppointmentSlots = donationSlots - appointmentSlots.length

            // let id = userData._id;

            // let hospital = "Montreal General Hospital, Montreal, QC H3G 1A4.";
            // let status = "CONFIRMED"
            // var datetime = new Date();
            // // console.log(datetime.toISOString().slice(0,10));
            // let donationDate = datetime.toISOString().slice(0, 10);

            // appointment = new Appointment({
            //     createdByUser: req.user.id, location, donationDate, bloodGroup, status, hospital
            // });

            // await appointment.save();

            // store = new Store({
            //     createdByUser: req.user.id, location, hospital, donationSlots: 20, bloodGroup: { APlus: 2, AMinus: 0, BPlus: 1, BMinus: 2, ABPlus: 1, ABMinus: 2, OPlus: 1, OMinus: 2 }
            // });

            // await store.save();

            res.json({ appointmentsLog });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    });



//@route  post api/users/donor/getDonorLog
//@desc   Test route
//@access Public

router.post('/donor/getAppointmentslots', auth,
    [
        check('location', 'location is  required').not().isEmpty(),
        check('donationDate', 'donationDate  is required').not().isEmpty(),
        check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors.mapped())
            return res.status(400).json({ errors: errors.array() })
        }
        const user = await User.findById(req.user.id);
        const { location, donationDate, bloodGroup } = req.body;
        try {
            // let appointmentsLog = await Appointment.find({ createdByUser: user.id }).sort('-createdDate');

            let store = await Store.findOne({ location });
            donationSlots = store.donationSlots;

            // var datetime = new Date();
            // let donationDate = datetime.toISOString().slice(0, 10);
            // console.log(donationDate);
            let appointmentSlots = await Appointment.find({ donationDate });
            let remainingAppointmentSlots = donationSlots - appointmentSlots.length

            // let id = userData._id;

            // let hospital = "Montreal General Hospital, Montreal, QC H3G 1A4.";
            // let status = "CONFIRMED"
            // var datetime = new Date();
            // // console.log(datetime.toISOString().slice(0,10));
            // let donationDate = datetime.toISOString().slice(0, 10);

            // appointment = new Appointment({
            //     createdByUser: req.user.id, location, donationDate, bloodGroup, status, hospital
            // });

            // await appointment.save();

            // store = new Store({
            //     createdByUser: req.user.id, location, hospital, donationSlots: 20, bloodGroup: { APlus: 2, AMinus: 0, BPlus: 1, BMinus: 2, ABPlus: 1, ABMinus: 2, OPlus: 1, OMinus: 2 }
            // });

            // await store.save();

            res.json({ remainingAppointmentSlots, donationDate, location });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    });


//@route  Post api/users/donor/updateAppointment
//@desc   Test route
//@access Public

router.post('/donor/updateAppointment', auth,
    [
        check('location', 'location is  required').not().isEmpty(),
        check('donationDate', 'donationDate  is required').not().isEmpty(),
        check('bloodGroup', 'Blood group  is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors.mapped())
            return res.status(400).json({ errors: errors.array() })
        }
        const user = await User.findById(req.user.id);
        const { location, donationDate, bloodGroup } = req.body;
        try {

            var appointments = await Appointment.find({ createdByUser: user.id }).populate({ path: 'createdByUser', select: 'name email' }).sort('-donationDate');
            // console.log(appointments);
            let store = await Store.findOne({ location });
            let hospital = store.hospital;
            let status = "CONFIRMED";


            if (appointments.length != 0) {
                var lastAppointment = appointments[0];
                var lastDonationDate = lastAppointment.donationDate;
                var monthsDiff = timediff(lastDonationDate, donationDate, 'M');
                var lastAppointment = await Appointment.find({ createdByUser: user.id, donationDate: lastDonationDate }).populate({ path: 'createdByUser', select: 'name email' });

                if (store != null) {

                    if (lastDonationDate == donationDate) {
                        // console.log(lastAppointment[0].id);
                        let appointment = await Appointment.findOne({ _id: lastAppointment[0].id }).populate({ path: 'createdByUser', select: 'name email' });
                        appointment.location = location;
                        appointment.donationDate = donationDate;
                        appointment.status = status;
                        appointment.hospital = hospital;
                        var response = await appointment.save();
                        res.json({ response });
                    } else if (monthsDiff.months >= 3) {
                        //Creating new appointment
                        appointment = new Appointment({
                            createdByUser: req.user.id, location, donationDate, bloodGroup, status, hospital
                        });
                        response = await appointment.save();
                        res.json({ response });
                    }
                    else {
                        res.status(400).json({ errors: [{ msg: 'User not eligible, come back after 3 months!' }] });
                    }
                } else {
                    res.status(400).json({ errors: [{ msg: 'Location doesnt Exist' }] });
                }
            } else {//Creating new appointment
                appointment = new Appointment({
                    createdByUser: req.user.id, location, donationDate, bloodGroup, status, hospital
                });
                response = await appointment.save();
                res.json({ response });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }


    });



//@route  Post api/users//store/getAvailableBloodDetails
//@desc   Test route
//@access Public

router.post('/store/getAvailableBloodDetails', auth, async (req, res) => {

    const user = await User.findById(req.user.id);

    try {
        var location = user.location;

        if (req.body != null) {
            if (req.body.location != null) {
                location = req.body.location;
            }
        }

        let store = await Store.find();//findOne({ location });
        if (store.length >= 0) {//(store != null)
            res.json({ store });//store

        } else {

            res.status(400).json({ errors: [{ msg: 'Location doesnt Exist, Try from the list with city name' }] });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});


//@route  Post api/users/store/getAllDonorLog
//@desc   Test route
//@access Public
router.post('/store/getAllDonorLog', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    try {
        var datetime = new Date();

        datetime.setMonth(datetime.getMonth() - 3);
        var date = datetime.toISOString().slice(0, 10);
        //console.log(date);
        // console.log(donationDate);
        // var monthsDiff = timediff(donationDate, currentDate, 'M');

        // let users = await User.find();
        // let users = await User.find(
        //     { //query today up to tonight
        //         // date: {
        //         //     $lte: date

        //         // }
        //     });

        let appointments = await Appointment.find({ //query date of 3 months prior
            donationDate: {
                $lte: date

            }
        }).populate({ path: 'createdByUser', select: 'name email' }).sort('-donationDate');
        // let myReqs = await MyReq.find();

        res.json({ appointments });



        //     res.status(400).json({ errors: [{ msg: 'Location doesnt Exist, Try from the list with city name' }] });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});




//@route  Post api/users/store/updateMyRequest
//@desc   Test route
//@access Public

router.post('/store/updateMyRequest', auth, async (req, res) => {

    const user = await User.findById(req.user.id);

    const { location, donationDate, bloodGroup } = req.body;
    try {

        const createdByUser = user.id;

        const userRequestType = req.body.userRequestType;
        const location = req.body.location;
        let store = await Store.findOne({ location });
        const hospital = store.hospital;
        var storeUpdated = false;


        if (userRequestType == "STORE_BLOOD_REQ") {
            // const reqToUser = ;
            const status = "CONFIRM";
            const bloodGroup = req.body.bloodGroup;
            const donationDate = req.body.donationDate;

            store = await Store.findOne({ location });
            // console.log(String(bloodGroup), bloodGroup);
            switch (String(bloodGroup)) {
                case 'A+':
                    if (store.bloodGroup.APlus >= 1) {
                        store.bloodGroup.APlus = store.bloodGroup.APlus - 1;
                        storeUpdated = true;
                        // console.log(bloodGroup + "A+" + store.bloodGroup.APlus + "storeUpdated" + storeUpdated);
                    } break;

                case 'A-':
                    if (store.bloodGroup.AMinus >= 1) {
                        store.bloodGroup.AMinus = store.bloodGroup.AMinus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "A-" + store.bloodGroup.AMinus + "storeUpdated" + storeUpdated);
                    } break;

                case 'B+':
                    if (store.bloodGroup.BPlus >= 1) {
                        store.bloodGroup.BPlus = store.bloodGroup.BPlus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "B+" + store.bloodGroup.BPlus);
                    } break;

                case 'B-':
                    if (store.bloodGroup.BMinus >= 1) {
                        store.bloodGroup.BMinus = store.bloodGroup.BMinus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "B-" + store.bloodGroup.BMinus);
                    } break;

                case 'AB+':
                    if (store.bloodGroup.ABPlus >= 1) {
                        store.bloodGroup.ABPlus = store.bloodGroup.ABPlus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "AB+" + store.bloodGroup.ABPlus);
                    } break;

                case 'AB-':
                    if (store.bloodGroup.ABMinus >= 1) {
                        store.bloodGroup.ABMinus = store.bloodGroup.ABMinus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "AB-" + store.bloodGroup.ABMinus);
                    } break;

                case 'O+':
                    if (store.bloodGroup.OPlus >= 1) {
                        store.bloodGroup.OPlus = store.bloodGroup.OPlus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "O+" + store.bloodGroup.OPlus);
                    } break;

                case 'O-':
                    if (store.bloodGroup.OMinus >= 1) {
                        store.bloodGroup.OMinus = store.bloodGroup.OMinus - 1; storeUpdated = true;
                        // console.log(bloodGroup + "O-" + store.bloodGroup.OMinus);
                    } break;

                default: storeUpdated = false; break;



            }

            if (storeUpdated) {
                response1 = await store.save();
                // console.log(response1);

                myReq = new MyReq({
                    createdByUser, location, donationDate, bloodGroup, status, hospital, userRequestType
                });

                response = await myReq.save();
                res.json({ response });
            } else {

                res.status(400).send(' Invalid Details of STORE_BLOOD_REQ')
            }
        }



        else if (userRequestType == "DONOR_BLOOD_REQ") {
            const status = "PENDING";//Will update to confirm on user approval

            const reqToUser = req.body.reqToUser; //Will hold Id.
            const bloodGroup = req.body.bloodGroup;
            const donationDate = req.body.donationDate;

            myReq = new MyReq({
                createdByUser, reqToUser, location, donationDate, bloodGroup, status, hospital, userRequestType
            });
            response = await myReq.save();
            res.json({ response });

        }
        else if (userRequestType == "REQ_TO_ADMIN") {
            const status = "CONFIRM";
            // const reqToUser = "ADMIN";
            const description = req.body.description;
            const bloodGroup = req.body.bloodGroup;

            myReq = new MyReq({
                createdByUser, location, status, hospital, userRequestType, description, bloodGroup
            });
            response = await myReq.save();
            res.json({ response });

        } else {
            res.status(400).json({ errors: [{ msg: 'Missing User Request  type Details' }] });
        }
        // res.json("response");


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error Or Invalid Details')
    }


});



//@route  Post api/users/donor/getMyRequestList
//@desc   Test route
//@access Public

router.post('/donor/getMyRequestList', auth, async (req, res) => {

    const user = await User.findById(req.user.id);


    try {
        const createdByUser = user.id;
        // const userRequestType = "DONOR_BLOOD_REQ";    search: , userRequestType 
        const reqToUser = user.id; //Will hold Id.
        // const status = "PENDING"; Search: , status 
        userType = user.userType;
        if (userType == "ADMIN") {
            myReqs = await MyReq.find({ $or: [{ createdByUser }, { reqToUser }, { userRequestType: "REQ_TO_ADMIN" }] }).populate({ path: 'createdByUser', select: 'name email' }).populate({ path: 'reqToUser', select: 'name email' }).sort('-createdDate');
        } else {


            myReqs = await MyReq.find({ $or: [{ createdByUser }, { reqToUser }] }).populate({ path: 'createdByUser', select: 'name email' }).populate({ path: 'reqToUser', select: 'name email' }).sort('-createdDate');
        }
        res.json({ myReqs });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error ')
    }
});



//@route  Post api/users/donor/updateMyRequestList
//@desc   Test route
//@access Public

router.post('/donor/updateMyRequestList', auth, async (req, res) => {

    const user = await User.findById(req.user.id);

    const { id, status, description } = req.body;
    try {

        var datetime = new Date();
        var date = datetime.toISOString().slice(0, 10);

        const userRequestType = "DONOR_BLOOD_REQ";

        const updatedBy = user.id;
        const updatedDate = date;

        //console.log(id, updatedBy, updatedDate, status, description);
        myReq = await MyReq.findOne({ id, userRequestType, status: "PENDING" }).populate({ path: 'createdByUser', select: 'name email' });
        if (myReq != null) {

            if ((status == "CONFIRM") || (status == "DECLINE")) {
                myReq.status = status; // "status": "PENDING",//CONFIRM OR DECLINE
            }
            myReq.description = description;
            myReq.updatedBy = updatedBy;
            myReq.updatedDate = updatedDate;
            response = await myReq.save();
            // appointment = new Appointment({
            //     createdByUser: req.user.id, location, donationDate, bloodGroup, status, hospital
            // });
            // response = await appointment.save();
            res.json({ response });
            res.json(response);
        } else {
            res.status(400).json({ errors: [{ msg: 'No requests found!' }] });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error  ')
    }


});




module.exports = router;