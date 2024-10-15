import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../models/user.js';
import ErrorHandler from '../utils/ErrorHandler.js'
import sendToken from '../utils/sendToken.js';
import sendEmail from '../utils/sendEmail.js';
import { getResetPasswordTemplate } from '../utils/emailTemplates.js';
import crypto from 'crypto';

// Register User => api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    })

    sendToken(user, 201, res);
});

// Login User => api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please enter email and password", 400))

    //Find user in database
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 401))


    //Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 401))


    sendToken(user, 200, res);
});

// Log Out User => api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        message: "Logged Out"
    })
});

// Forgot Password  => api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    //Find user in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler("User not found with this email", 404));
    // Reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    const message = getResetPasswordTemplate(user?.name, resetUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "ShopIT Password Recovery",
            message,
        });

        res.status(200).json({
            message: `Email sent to ${user?.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new ErrorHandler(error?.message, 500))
    }

});

// Reset Password  => api/v1/password/reset
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) return next(new ErrorHandler("Password reset token is invalid or has been expired", 400))

    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("Passwords don't match", 400))

    //*Set new password
    user.password = req.body.password

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

//Get curent user profile => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id);

    res.status(200).json({
        user,
    });
});

//Password Update => api/v1/password/update
export const passwordUpdate = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id).select("+password");

    //Check the old password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) return next(new ErrorHandler("Old password is incorrect", 400));

    user.password = req.body.password;
    user.save();

    res.status(200).json({
        success: true,
    });
});

//Update User Profile => api/v1/me/update
export const userUpdate = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, { new: true });

    res.status(200).json({
        user,
    });
});

//Get All Users - Admin => api/v1/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        users,
    })
});

//Get User Details -Admin => api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404))

    res.status(200).json({
        user,
    })
});

//Update User Details - Admin => api/v1/admin/users/:id
export const updateUserAdmin = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true });

    res.status(200).json({
        user,
    });
});

//Delete User - Admin => api/v1/admin/users/:id
export const deleteUserAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = User.findById(req.params.id);

    if (!user) return next(new ErrorHandler(`User not found with id: ${req.params.id}`));

    //! TODO -- Remove user avatar from cloudinary

    await user.deleteOne();

    res.status(200).json({
        success: true,
    })
})