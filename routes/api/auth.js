const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Organization = require('../../models/Organization')
const { check, validationResult } = require('express-validator/check');

const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/', auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');


    }

    // res.send('Auth Router')
});

// //@route  GET api/auth
// //@desc   My User
// //@access Private
// router.get('/me', auth, async (req, res) => {

//     try {
//         //We get user details from Auth middleware verification!
//         const user = await User.findById(req.user.id).select('-password');
//         res.json(user);

//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');


//     }

//     // res.send('Auth Router')
// });


// //@route  Delete api/auth/myPostData
// //@desc   My User
// //@access Private
// router.delete('/myPostData', auth, async (req, res) => {

//     try {
//         //We get user details from Auth middleware verification!

//         // We can delete other table details linked to the user
//         //  await Post.findById(req.user.id); //Post is other table let us assume for example

//         //We can delete User as well
//         //  await User.findOneAndRemove({_id: req.user.id })
//         res.json({ msg: "User removed" });

//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');


//     }

//     // res.send('Auth Router')
// });

// //@route  PUT api/auth/experience
// //@desc   My User
// //@access Private
// router.put('/experience', [auth, [
//     //check()//check for details
// ]], async (req, res) => {

//     try {
//         //We get user details from Auth middleware verification!

//         // We can Create new experience other table details linked to the user
//         // const post = await Post.findById(req.user.id); //Post is other table let us assume for example

//         //TO DELETE the experience: Unshif the id & remove the index from the array object of the experience
//         //post.save();

//         res.json({ msg: "Experience added" });

//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');


//     }

//     // res.send('Auth Router')
// });







// //@route  GET api/auth
// //@desc   User by Id
// //@access Public
// router.get('/user/:id', async (req, res) => {

//     try {
//         //We get user details from Auth middleware verification!
//         // console.log(req.params.id);
//         const user = await User.findById(req.params.id).select('-password');
//         res.json(user);
//         // res.send('Auth Router')

//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');


//     }


// });




// //@route  GET api/auth
// //@desc  All Users
// //@access Public
// router.get('/allUsers', async (req, res) => {

//     try {
//         //We get user details from Auth middleware verification!
//         const users = await User.find();
//         const organizations = await Organization.find();
//         //let c = Object.assign(users, organizations)
//         res.json(users);

//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');


//     }

//     // res.send('Auth Router')
// });







module.exports = router;