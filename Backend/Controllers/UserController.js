
const bcrypt = require("bcryptjs");
const UserModel = require("../Models/UserModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const sendMails = require("../Utils/Nodemailer");
const ForgetPasswordTemplete = require("../EmailTempletes/forgotPasswordTemplete");
const Commerce3WelcomeEmail = require("../EmailTempletes/WelocmeTemplete");
const passwordUpdatedTemplate = require("../EmailTempletes/UpdatePasswordTemplete");
const ProductsModel = require("../Models/ProductsModel");

// ======================================================
// COMMON JWT COOKIE
// Used by normal signup, normal signin, and Google OAuth
// ======================================================
const createAuthCookie = (res, user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 30 * 60 * 1000,
  });
};

// ======================================================
// NORMAL SIGNUP
// ======================================================
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await UserModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    createAuthCookie(res, data);

    // Sending welcome email should not invalidate signup.
    try {
      const html = Commerce3WelcomeEmail(name);

      await sendMails({
        to: normalizedEmail,
        subject: "Welcome to Commerce3.0 website",
        html,
      });
    } catch (mailError) {
      console.error("Welcome email failed:", mailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      details: data,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ======================================================
// NORMAL SIGNIN
// ======================================================
const UserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    // Google-only users may not have a password.
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Please sign in using Google",
      });
    }

    const flag = await bcrypt.compare(password, user.password);

    if (!flag) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    req.RequestName = user;

    createAuthCookie(res, user);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      details: user,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ======================================================
// GOOGLE AUTH SUCCESS CALLBACK
// Passport must authenticate the user before this runs.
// ======================================================
const GoogleAuthSuccess = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
      );
    }

    createAuthCookie(res, user);

    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/success`
    );
  } catch (err) {
    console.error("Google OAuth error:", err.message);

    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=authentication_failed`
    );
  }
};

// ======================================================
// OPTIONAL GOOGLE OAUTH ROUTE HANDLERS
// Mount these at /auth/google and /auth/google/callback.
// Config/passport.js must configure the GoogleStrategy.
// ======================================================
const GoogleAuthStart = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

const GoogleAuthCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
  }),
  GoogleAuthSuccess,
];

// ======================================================
// LOGOUT
// ======================================================
const UserLogOut = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// ======================================================
// FORGOT PASSWORD
// ======================================================
const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");

    const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save();

    try {
      // Preserve your existing reset-link pattern.
      // Configure FRONTEND_URL if your reset page is on the frontend.
      const reset_link =
        `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

      const html = ForgetPasswordTemplete(user.name, reset_link);

      await sendMails({
        to: user.email,
        subject: "Forgot-reset password link",
        html,
      });

      return res.status(200).json({
        success: true,
        message: "Email for password reset has been sent",
      });
    } catch (mailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: "Failed to send reset email",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ======================================================
// RESET PASSWORD
// ======================================================
const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    const resetHashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: resetHashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Access denied or reset link expired",
      });
    }

    const { password, confirmPassword } = req.body;

    if (!password || password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password must match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    try {
      const html = passwordUpdatedTemplate(user.name);

      await sendMails({
        to: user.email,
        subject: "Your Commerce3 password has been changed",
        html,
      });
    } catch (mailError) {
      console.error("Password update email failed:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ======================================================
// ADD OR UPDATE REVIEW
// ======================================================
const AddReviewAndUpdate = async (req, res) => {
  try {
    const user = req.RequestName;
    const product_id = req.query.Product_id;

    const product = await ProductsModel.findById(product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { rating, review } = req.body;

    const reviews = product.reviews || [];

    const foundIndex = reviews.findIndex(
      (r) => String(r.user) === String(user._id)
    );

    if (foundIndex !== -1) {
      reviews.splice(foundIndex, 1);
    }

    reviews.push({
      user: user._id,
      user_name: user.name,
      rating,
      review,
    });

    const sum = reviews.reduce(
      (total, rev) => total + Number(rev.rating),
      0
    );

    const rate = sum / reviews.length;

    const data = await ProductsModel.findByIdAndUpdate(
      product_id,
      {
        reviews,
        number_of_review: reviews.length,
        rating: rate.toFixed(3),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product reviews updated successfully",
      product_details: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: err.message,
    });
  }
};

// ======================================================
// ADD TO CART
// ======================================================
const AddToCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.RequestName._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { Product_id, size } = req.body;

    if (!Product_id) {
      return res.status(400).json({
        success: false,
        message: "Product_id is required",
      });
    }

    if (
      user.cart.some(
        (item) => String(item.product_id) === String(Product_id)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Already added to cart",
      });
    }

    user.cart.push({
      product_id: Product_id,
      quantity: 1,
      size,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Added to cart successfully",
      details: user.cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// GET CART PRODUCTS
// ======================================================
const GetCartProductList = async (req, res) => {
  try {
    const user = await UserModel.findById(req.RequestName._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const ids = (user.cart || []).map((item) => item.product_id);

    const products = await ProductsModel.find({
      _id: { $in: ids },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched cart products successfully",
      details: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// REMOVE FROM CART
// ======================================================
const RemoveFromCart = async (req, res) => {
  try {
    const { Product_id } = req.body;

    const user = await UserModel.findById(req.RequestName._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const index = user.cart.findIndex(
      (item) => String(item.product_id) === String(Product_id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    user.cart.splice(index, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Removed from cart",
      details: user.cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// ADD SEARCH KEYWORD
// ======================================================
const addSearch = async (req, res) => {
  try {
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const userData = await UserModel.findById(req.RequestName._id);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    if (userData.recentSearch.includes(keyword)) {
      return res.status(200).json({
        success: true,
        message: "Already searched",
      });
    }

    userData.recentSearch.push(keyword);
    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Search added successfully",
      userData: userData.recentSearch,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// GET SEARCHED PRODUCTS
// ======================================================
const getAllSearchedKeyWord = async (req, res) => {
  try {
    const user = await UserModel.findById(req.RequestName._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const searchARR = user.recentSearch || [];

    if (searchARR.length === 0) {
      return res.status(200).json({
        success: true,
        details: [],
      });
    }

    const products = await ProductsModel.find({
      catogary: { $in: searchARR },
    });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched products",
      details: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  createUser,
  UserSignIn,
  UserLogOut,
  ForgetPassword,
  resetPassword,
  AddReviewAndUpdate,
  AddToCart,
  GetCartProductList,
  RemoveFromCart,
  addSearch,
  getAllSearchedKeyWord,

  // Google OAuth
  GoogleAuthSuccess,
  GoogleAuthStart,
  GoogleAuthCallback,
};
