const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports.signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: 'User already exists!!'});
        }
        //securely hashing the password during signup
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        return res.status(201).json({message: 'User created successfully!'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: 'Invalid Credentials!!'});
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(400).json({message: 'Invalid Credentials!!'});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        return res.json({ token });
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}