// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});
const Tokens = mongoose.model("Token", tokenSchema, "Tokens");

// Export the model
module.exports = Tokens;
