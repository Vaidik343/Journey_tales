const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokens");

/**
 * CREATE USER
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check if email exists
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL USERS
 */
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * GET USER BY ID
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE USER
 */
const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Updated successfully", user });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE USER
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "Deleted successfully", user });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email not exists!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        accessToken,
        user: {
          id: user.id, // Sequelize uses `id`, not `_id`
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGOUT
 */
const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(400).json({ message: "No refresh token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findByPk(decoded.id);
    if (user) {
      await user.update({ refreshToken: null });
    }

    res.clearCookie("refreshToken").json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.clearCookie("refreshToken").json({ message: "Logged out" });
  }
};

/**
 * REFRESH TOKEN
 */
const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};

module.exports.userController = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  logout,
  refreshToken,
};