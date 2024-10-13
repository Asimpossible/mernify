import catchAsyncErrors from './catchAsyncErrors.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

//Check user authenticated or non-authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) return next(new ErrorHandler("Login first to access this resource", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

// Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) next(new ErrorHandler(`Role (${req.user.role}) is not allowed access this resource`, 403))
        next();
    };
}