const Eligibility = require("../models/eligibility.model");

//get
exports.eligibilityDetails = function(req, res) {
  age = parseInt(req.params.age);
  id = parseInt(req.params.id);
  Eligibility.find({ eligibilityId: id }).exec((err, eligibility) => {
    if (err) return next(err);
    record = eligibility[0];
    if (record)
      if (record.minAge <= age && age <= record.maxAge) res.send(record);
      else res.send({ isInEligible: true });
    else res.send("Record not found.");
  });
};

//create
exports.eligibilityCreate = function(req, res, next) {
  console.log("Inside create logic");
  let eligibility = new Eligibility({
    eligibilityId: req.body.eligibilityId,
    minAge: req.body.minAge,
    maxAge: req.body.maxAge,
    minSalary: req.body.minSalary,
    minExperience: req.body.minExperience,
    minCurrentCompanyExperience: req.body.minCurrentCompanyExperience,
    netTakeHome: req.body.netTakeHome
  });

  eligibility.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Eligibility Created successfully");
  });
};

//update
//get
exports.eligibilityDelete = function(req, res, next) {
  Eligibility.deleteMany({ eligibilityId: req.params.id }).exec(err => {
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
