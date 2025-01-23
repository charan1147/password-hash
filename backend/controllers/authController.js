const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')


dotenv.config()

exports.addUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send("User added successfully");

  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Internal server Error or adding new user failed");
  }
};



exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "10mins" });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_API_KEY,
      },
    });
    
    const mailOptions = {
      from: process.env.SENDGRID_EMAIL,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent successfully:", info.response);
      res.send("Reset email sent");
    });
  } catch (err) {
    console.error("Error in requestReset:", err);
    res.status(500).send("Server error");
  }
};


exports.validateReset = (req, res) => {
  const { token } = req.params;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.send("Token is valid");
  } catch (err) {
    console.error("Error validating token:", err);
    res.status(400).send("Invalid or expired token");
  }
};



exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send("Password reset successfully");
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(400).send("Invalid or expired token");
  }
};




















