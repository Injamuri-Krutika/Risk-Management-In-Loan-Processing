const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const registerController = require("../controllers/register.controller");

router.post("/add", registerController.addCustomer);

router.delete("/delete", registerController.deleteCustomer);

module.exports = router;
