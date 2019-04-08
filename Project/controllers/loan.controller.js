const Customers = require("../models/customers.model");

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
      loanAcceptedDate: Date.now
    }
  ).exec((err, loansUpdated) => {
    if (err) return next(err);
    console.log(loansUpdated);
    let record = { loansUpdated };
    if (record) {
      res.send(loansUpdated);
      return;
    }
    res.send("Loans not updated");
  });
};
