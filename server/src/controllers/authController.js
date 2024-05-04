const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");
const { generateToken } = require("../utils/handleJWT.js");

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
const signup = async (req, res, next) => {
  try {
    const { email, role, name } = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists && userAlreadyExists.status === "ACTIVE") {
      throw new ExpressError("User already exists.", 409);
    }
    let newUser;
    if (userAlreadyExists && userAlreadyExists.status === "INACTIVE") {
      const restoredUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          role,
          name,
          status: "ACTIVE",
        },
      });
      newUser = restoredUser;
    }
    if (!userAlreadyExists) {
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          email,
          role,
          name,
        },
      });
      newUser = user;
    }
    console.log(newUser);
    if (newUser) {
      const token = generateToken(
        {
          email: newUser.email,
        },
        "2h"
      );


      res.cookie("token", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true
      });
      res.cookie("role", role, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true
      });
      res.cookie("name", newUser.name, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true
      });

      return res.status(201).json({
        ok: true,
        message: "User registered successfully.",
        data: {
          user: {
            email: newUser.email,
            role: newUser.role,
            name: newUser.name,
            profileComplete: false
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
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.status === "INACTIVE") {
      throw new ExpressError("User does not exists", 400);
    }
    
    //Checking complete profile assertion 
    let profileIsComplete = true;
    if (user.role === "DOCTOR" || user.role === "PARAMEDICAL") {
        const staffExists = await prisma.staff.findUnique({
          where: {
            email,
          }
        });

        if (!staffExists || staffExists.status === "INACTIVE") {
          profileIsComplete = false;
        }
    } else if (user.role === "PATIENT") {
        const patientExists = await prisma.patient.findUnique({
          where: {
            email,
          }
        });

        if (!patientExists || patientExists.status === "INACTIVE") {
          profileIsComplete = false;
        }
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    res.cookie("token", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true
    });
    res.cookie("role", user.role, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true
    });
    res.cookie("name", user.name, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true
    });

    return res.status(200).json({
      ok: true,
      message: `Logged in successfully as ${user.role}`,
      data: {
        user: {
          email: user.email,
          role: user.role,
          name: user.name,
          profileComplete: profileIsComplete
        },
      },
    });
  } catch (err) {
    throw new ExpressError(err.message, 500);
  }
};

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
const logout = async (req, res, next) => {
  try {
    console.log("Logging out...");

    res.clearCookie("token", {
      httpOnly: true,
      // secure: true,
    });
    res.clearCookie("role", {
      httpOnly: true,
      // secure: true
    });
    res.clearCookie("name", {
      httpOnly: true,
      // secure: true
    });

    return res.status(200).json({
      ok: true,
      message: "User logout successfully.",
      data: {},
    });
  } catch (err) {
    throw new ExpressError(err.message, 500);
  }
};

module.exports = {
  signup,
  login,
  logout
};
