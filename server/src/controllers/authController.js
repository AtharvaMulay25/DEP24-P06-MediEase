const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const validationRes = userValidation(username, email, password, "signup");
    if (!validationRes.valid) {
      const error = new CustomError(validationRes.error, 400, "signup");
      next(error);
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      const error = new CustomError("User already exists.", 400, "signup");
      next(error);
    }

    //hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
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

      return res.status(201).json({
        ok: true,
        message: "User registered successfully.",
        data: {
          user: {
            username: user.username,
            email: user.email,
          },
        },
      });
    }

    const error = new CustomError("User Registration failed.", 400, "signup");
    next(error);
  } catch (err) {
    const error = new CustomError(err.message, 500, "signup");
    next(error);
  }
};

// @desc     User Login
// route     POST /api/auth/login
// @access   Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationRes = userValidation("", email, password, "login");
    if (!validationRes.valid) {
      const error = new CustomError(validationRes.error, 400, "login");
      next(error);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      const err = new CustomError("Incorrect email or password", 400, "login");
      next(err);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      const error = new CustomError(
        "Incorrect email or password",
        401,
        "login"
      );
      next(error);
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({
      ok: true,
      message: "User logged in successfully.",
      data: {
        user: {
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (err) {
    const error = new CustomError(err.message, 500, "login");
    next(error);
  }
};

module.exports = {
  signup,
  login,
};