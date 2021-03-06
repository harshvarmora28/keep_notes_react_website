const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "@harsh__creations";


// ROUTE 1: Create a user using: POST "/api/auth/createuser", No Login Required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 })


], async (req, res) => {
    let success = false;
    // If there are errors return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Check whether the same email exists already
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ success, error: "User with this email already exists, please choose another email"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user:{
                id: user.id
            }
    }

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("We are sorry, we ran into an issue!😓");
    }

});

// ROUTE 2: Authentication of a user using: POST "/api/auth/login". No login required
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
], async (req, res) => {

    let success = false;

    // If there are errors return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({ success, error: "Incorrect Email or Password!"});
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success, error: "Incorrect Email or Password!"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch(error){
        console.error(error.message);
        res.status(500).send("We are sorry, we ran into an issue!😓");
    }

});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("We are sorry, we ran into an issue!😓");
    }
});

module.exports = router;
