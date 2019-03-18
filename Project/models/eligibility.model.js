const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EligibilitySchema = new Schema(
  {
    eligibilityId: { type: Number },
    minAge: { type: Number },
    maxAge: { type: Number },
    minSalary: { type: Number },
    minExperience: { type: Number },
    minCurrentCompanyExperience: { type: Number },
    netTakeHome: { type: Number }
  }
  // { _id: false }
);

// Export the model
module.exports = mongoose.model("Eligibility", EligibilitySchema);
