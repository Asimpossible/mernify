import ErrorHandler from '../utils/ErrorHandler.js'

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error"
    }

    //Handle Invalid Mongoose ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err?.path} `
        error = new ErrorHandler(message, 404)
    }

    //Handle Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => value.message).join(', ')
        error = new ErrorHandler(message, 400)
    }

    //Handle Mongoose Dublicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate field value entered for ${Object.keys(err.keyValue)}: ${Object.values(err.keyValue).join(', ')}`;
        error = new ErrorHandler(message, 400)
    }

    //Handle wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = "JSON Web Token is invalid. Try again!!!";
        error = new ErrorHandler(message, 400);
    }

    //Handle expired JWT Error
    if (err.name === 'TokenexpiredError') {
        const message = "JSON Web Token is expired. Try again!!!";
        error = new ErrorHandler(message, 400);
    }

    // Clean up unnecessary fields like `errorResponse`
    if (err.errorResponse) {
        delete err.errorResponse;
    }

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        console.log("Error: ", error.message),

            res.status(error.statusCode).json({
                message: error.message,
                error: err,
                stack: err?.stack,
            });
    }

    if (process.env.NODE_ENV === "PRODUCTION") {



        res.status(error.statusCode).json({
            message: error.message,
        });
    }
};