//utils
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { verifyToken } = require("../utils/handleJWT");
const ExpressError = require('../utils/ExpressError');

const authMiddleware = (role) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;

            if (!token) {
                const error = new ExpressError("Token not found", 401);
                next(error);
            }

            const data = verifyToken(token);

            if (!data) {
                const error = new ExpressError(
                    "Request is not authorized",
                    401
                );
                next(error);
            }

            const { email } = data;
            req.user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            req.recievedToken = token;
            req.role = req.user?.role;

            if (!req.user || (req.user.role !== role)) {
                const error = new ExpressError(
                    "User does not exist",
                    404
                );
                next(error);
            } else {
                next();
            }
        } catch (err) {
            const error = new ExpressError(err.message, 401);
            next(error);
        }
    };
}

module.exports = authMiddleware;