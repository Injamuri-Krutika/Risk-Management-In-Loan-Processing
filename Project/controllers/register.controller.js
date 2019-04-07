// Controller to handle all login/* routes
/* eslint-disable no-console */
// import { Customers } from "../models/customers.model";
const Customers = require("../models/customers.model");
const Tokens = require("../models/tokens.model");

require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.addCustomer = (request, response) => {
  const newCustomer = new Customers({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    dob: request.body.dob,
    employerType: request.body.employerType,
    income: request.body.income,
    user: request.body.email,
    email: request.body.email,
    employmentType: request.body.employmentType,
    phoneNumber: request.body.phoneNumber,
    emiPerMonth: request.body.emiPerMonth,
    overallExp: request.body.overallExp,
    currentCompanyExp: request.body.currentCompanyExp,
    incomePerMonth: request.body.incomePerMonth,
    incomePerAnnum: request.body.incomePerAnnum,
    residenceOwned: request.body.residenceOwned,
    officeOwned: request.body.officeOwned,
    password: request.body.password,
    eligibleLoanAmount: request.body.eligibleLoanAmount,
    finalLoanAmount: request.body.finalLoanAmount,
    // finalTenure: request.body.finalTenure,
    finalEMI: request.body.finalEMI,
    tenure: request.body.tenure,
    roi: request.body.roi,
    loanEMI: request.body.loanEMI,
    loanStatus: request.body.loanStatus
  });
  console.log(newCustomer);
  newCustomer.save(err => {
    if (err) return console.error(err);
    const token = new Tokens({
      // eslint-disable-next-line no-underscore-dangle
      userId: newCustomer._id,
      token: crypto.randomBytes(16).toString("hex")
    });
    // eslint-disable-next-line consistent-return
    token.save(errToken => {
      if (errToken) return console.error(errToken);
      const from = `${process.env.FROM_EMAIL}@gmail.com`;
      const message = `${"Hello,\n\n" +
        "Please verify your account by clicking the link: \nhttp://"}${
        request.headers.host
      }/confirm/${token.token}.\n`;
      const to = newCustomer.email;
      console.log(to);
      console.log(from);
      console.log(process.env.FROM_EMAIL);
      console.log(process.env.PASS);

      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.FROM_EMAIL}@gmail.com`,
          pass: process.env.PASS
        }
      });

      const mailOptions = {
        from,
        to,
        subject: "Verification Link",
        text: message
      };
      smtpTransport.sendMail(mailOptions, (error, res) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Apparently a success${res}`);
        }
      });
    });
    return response.send("Saved");
  });
};

exports.deleteCustomer = function(req, res, next) {
  console.log("Inside delete customers");
  Customers.deleteMany({}).exec(err => {
    if (err) return next(err);
    // console.log(typeof req.params.id);
    // record = eligibility[0];
    // age = parseInt(req.params.age);
    // console.log(record.minAge, age, record.maxAge);
    res.send("Deleted Successfully!");
    // if (record.minAge < age && age < record.maxAge) res.send(record);
    // else res.send("Ineligible");
  });
};
