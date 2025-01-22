import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// Password strength validation functions
const passwordLengthValidator = (password) => password.length >= 8;
const passwordUppercaseValidator = (password) => /[A-Z]/.test(password);
const passwordNumberValidator = (password) => /\d/.test(password);
const passwordSpecialCharacterValidator = (password) => /[@$!%*?&]/.test(password);

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || username.trim() === '') {
        return next(errorHandler(400, 'Username must be provided'));
    }

    if (!email || email.trim() === '') {
        return next(errorHandler(400, 'Email must be provided'));
    }

    if (!password || password.trim() === '') {
        return next(errorHandler(400, 'Password must be provided'));
    }

    // Password validation
    if (!passwordLengthValidator(password)) {
        return next(errorHandler(400, 'Password must be at least 8 characters long.'));
    }

    if (!passwordUppercaseValidator(password)) {
        return next(errorHandler(400, 'Password must contain at least one uppercase letter.'));
    }

    if (!passwordNumberValidator(password)) {
        return next(errorHandler(400, 'Password must contain at least one number.'));
    }

    if (!passwordSpecialCharacterValidator(password)) {
        return next(errorHandler(400, 'Password must contain at least one special character (@, $, !, %, *, ?, &).'));
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return next(errorHandler(400, 'Username is already taken'));
            }

            if (existingUser.email === email) {
                return next(errorHandler(400, 'Email is already registered'));
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Signup was successful' });
    } catch (error) {
        console.error(error);
        return next(errorHandler(500, 'Something went wrong. Please try again later.'));
    }
};
