const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EligibilitySchema = new Schema({
  eligibilityId: { type: Number },
  minAge: { type: Number },
  maxAage: { type: Number },
  minSalary: { type: Number },
  maxSalary: { type: Number }
});

// Export the model
module.exports = mongoose.model("Eligibility", EligibilitySchema);
