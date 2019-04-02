// import mongoose from "mongoose";
const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  employerType: String,
  income: Number,
  user: String,
  email: String,
  employmentType: String,
  phoneNumber: Number,
  emiPerMonth: Number,
  overallExp: String,
  currentCompanyExp: String,
  incomePerMonth: String,
  incomePerAnnum: String,
  residenceOwned: String,
  officeOwned: String,
  password: String,
  isVerified: { type: Boolean, default: false }
});
const Customers = mongoose.model("Customers", CustomersSchema, "Customers");

// Export the model
module.exports = Customers;
