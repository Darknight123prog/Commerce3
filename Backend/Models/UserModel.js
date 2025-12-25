const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [25, "Name cannot exceed 25 characters"],
    minLength: [3, "Name must have at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: [validator.isEmail, "Invalid E-mail"]
  },
  googleId: { type: String },
  githubId: String,
  password: {
  type: String,
  required: function() {
    return this.authType === 'local';
  }
},
  authType: {
    type: String,
    enum: ["local", "google","github"],
    default: "local"
  },
  avator: {
    public_id: { type: String, default: '' },
    url: { type: String, default: '' }
  },
  role: { type: String, default: "User" },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("UserModel", UserSchema);
