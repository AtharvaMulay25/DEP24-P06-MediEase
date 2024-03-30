//This is wrapper for async functions to handle errors and pass them to error middleware

module.exports = fn =>
{
    return (req, res, next)=>
    {
        fn(req, res, next).catch(next);
    }
}