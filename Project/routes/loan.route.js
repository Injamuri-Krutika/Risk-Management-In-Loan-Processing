const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const loanController = require("../controllers/loan.controller");

router.get("/get", loanController.loanDetails);

router.put("/update", loanController.updateLoanDetails);

module.exports = router;
