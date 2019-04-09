const Customers = require("../models/customers.model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//get
exports.loanDetails = function(req, res) {
  Customers.find({ loanStatus: "Requested", isVerified: true }).exec(
    (err, loans) => {
      if (err) return next(err);
      let record = { loans };
      if (record) {
        res.send(record);
        return;
      }
      res.send("No loans in queue");
    }
  );
};

//update
exports.updateLoanDetails = function(req, res) {
  console.log(req.body);
  Customers.updateOne(
    {
      user: req.body.email
      // requestId: req.body.requestId
    },
    {
      loanStatus: req.body.loanStatus,
      // loanStatus: "Requested",

      loanAcceptedDate: Date.now
    }
  ).exec((err, loansUpdated) => {
    if (err) return next(err);
    console.log(loansUpdated);
    let record = { loansUpdated };
    if (record) {
      console.log("Inside sendEmail");
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.FROM_EMAIL}@gmail.com`,
          pass: process.env.PASS
        }
      });
      const from = `${process.env.FROM_EMAIL}@gmail.com`;
      const message = req.body.message;
      const to = req.body.email;
      const mailOptions = {
        from,
        to,
        subject: "Loan Status",
        text: message
      };
      smtpTransport.sendMail(mailOptions, (error, res) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Apparently a success${res}`);
        }
      });

      res.send(loansUpdated);
      return;
    }
    res.send("Loans not updated");
  });
};
