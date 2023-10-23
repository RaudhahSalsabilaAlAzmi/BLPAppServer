// import User from '../models/user.model.js';
// import bycrpt from "bcrypt";
// import jwt from 'jsonwebtoken';
// import createError from '../utils/CreateError.js';

const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../utils/CreateError.js');

const register = async (req, res, next) => {
    if(req.body.username == undefined || req.body.password == undefined || req.body.email == undefined) {
        return next(createError(403, "Username, password, and email required!"));
    }
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
            ...req.body,
            password: hash
        });

        await newUser.save();

        // Correct the header setting to 'application/json' using res.set()
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) return next(createError(404, 'User not found'));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, 'Wrong password or username'));
        // if (!isCorrect) return res.status(400).send('Wrong password or username');

        const token = jwt.sign({
            id: user.id,
            isSeller: user.isSeller,
        }, process.env.JWT_KEY)

        const {password, ...info} = user._doc;
        res.cookie("accessToken", token, {httpOnly: true}).status(200).send(info);
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res) => {
    res.clearCookie('accessToken', {
        sameSite: 'none',
        secure: true,
    }).status(200).send('User has been logged out.');
}

module.exports = {
    register,
    login,
    logout
}