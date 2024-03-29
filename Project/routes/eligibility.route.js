const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const eligibilityController = require("../controllers/eligibility.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/get/:id/:age", eligibilityController.eligibilityDetails);

router.post("/create", eligibilityController.eligibilityCreate);

// router.get("/update", eligibilityController.eligibilityUpdate);

router.delete("/delete/:id", eligibilityController.eligibilityDelete);

module.exports = router;
