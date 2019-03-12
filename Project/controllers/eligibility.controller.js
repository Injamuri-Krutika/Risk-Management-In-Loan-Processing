const Eligibility = require("../models/eligibility.model");

//get
exports.eligibilityDetails = function(req, res) {
  Eligibility.find({ eligibilityId: req.params.id }).exec(
    (err, eligibility) => {
      if (err) return next(err);
      res.send(eligibility);
    }
  );
};

//create
exports.eligibilityCreate = function(req, res) {
  console.log("Inside create logic");
  let eligibility = new Eligibility({
    eligibilityId: req.body.eligibilityId,
    minAge: req.body.minAge,
    maxAge: req.body.maxAge,
    minSalary: req.body.minSalary,
    maxSalary: req.body.maxSalary
  });

  eligibility.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Eligibility Created successfully");
  });
};

//update
