//This is custom error class to handle errors by providing error message and status code
class ExpressError extends Error
{
    constructor(message, statusCode)
    {
        super();    //inheriting error class properties
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = ExpressError;