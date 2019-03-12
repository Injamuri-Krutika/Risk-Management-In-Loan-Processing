const Eligibility = require("../models/eligibility.model");

//get
exports.eligibilityDetails = function(req, res) {
  console.log("Inside get eligibility");
  // Eligibility.find(function(err, product) {
  Eligibility.find({ eligibilityId: "1" }).exec((err, eligibility) => {
    if (err) return next(err);
    res.send(eligibility);
  });

  // app.post('/api/add', (request, response) => {
  //   // Find if the user exists in the database
  //   User.find({ userId: request.body.id }).exec((err, user) => {
  //     if (err) return response.send('Cannot do database lookup. Please try again later');
  //     if (!user) return response.send('No such user!');
  //     const newExercise = request.body.date
  //       ? new Exercise({
  //         userId: request.body.id,
  //         description: request.body.description,
  //         duration: request.body.duration,
  //         date: new Date(Date.parse(request.body.date)),
  //       })
  //       : new Exercise({
  //         userId: request.body.id,
  //         description: request.body.description,
  //         duration: request.body.duration,
  //         date: new Date(),
  //       });
  //     newExercise.save((error, data) => {
  //       if (error) return response.send('Could not save the log, please try again');
  //       return response.json(data);
  //     });
  //     return true;
  //   });
  // });

  // res.send("Working!!");
};

//create
exports.eligibilityCreate = function(req, res) {
  console.log("Inside create logic");
  //   console.log(req.body);
  let eligibility = new Eligibility({
    eligibilityId: req.body.eligibilityId,
    minAge: req.body.minAge,
    maxAge: req.body.maxAge,
    minSalary: req.body.minSalary,
    maxSalary: req.body.maxSalary
  });

  console.log(eligibility);

  eligibility.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Eligibility Created successfully");
  });
};

//update
