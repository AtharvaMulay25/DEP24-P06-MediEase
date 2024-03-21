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
    const { email, role , name} = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new ExpressError("User already exists.", 409);
    }

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        role, 
        name
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
            role: user.role
          },
        },
      });
    }

   throw new ExpressError("User Registration failed.", 400);

  } catch (err) {
    throw new ExpressError(err.message, 500);
  }
};

// @desc     User Login
// route     POST /api/auth/login
// @access   Public
const login = async (req, res, next) => {
  try {
    const { email} = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });

    if (!user) {
      throw new ExpressError("User does not exists", 400);
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("role", user.role, { httpOnly: true, secure: true });

    return res.status(200).json({
      ok: true,
      message: `Logged in successfully as ${user.role}`,
      data: {
        user: {
          email: user.email,
          role: user.role
        },
      },
    });
  } catch (err) {
    throw new ExpressError(err.message, 500);
  }
};

module.exports = {
  signup,
  login,
};