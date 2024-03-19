const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");
const { generateToken } = require("../utils/handleJWT.js");

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
const signup = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      const error = new ExpressError("User already exists.", 409);
      next(error);
    }

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        role 
      },
    });

    if (user) {
      const token = generateToken(
        {
          email: user.email,
        },
        "2h"
      );

      res.cookie("token", token, { httpOnly: true, secure: true });
      res.cookie("role", role, { httpOnly: true, secure: true });

      return res.status(201).json({
        ok: true,
        message: "User registered successfully.",
        data: {
          user: {
            email: user.email,
          },
        },
      });
    }

    const error = new ExpressError("User Registration failed.", 400);
    next(error);
  } catch (err) {
    const error = new ExpressError(err.message, 500);
    next(error);
  }
};

// @desc     User Login
// route     POST /api/auth/login
// @access   Public
const login = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
        role
      },
    });

    if (!user) {
      const err = new ExpressError("User does not exists", 400);
      next(err);
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("role", role, { httpOnly: true, secure: true });

    return res.status(200).json({
      ok: true,
      message: "User logged in successfully.",
      data: {
        user: {
          email: user.email,
        },
      },
    });
  } catch (err) {
    const error = new ExpressError(err.message, 500);
    next(error);
  }
};

module.exports = {
  signup,
  login,
};