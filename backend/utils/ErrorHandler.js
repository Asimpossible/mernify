class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Error stack property
        Error.captureStackTrace(this, this.constructor);
    }
}
export default ErrorHandler;    