import { Router } from "express";

const callback = require("../controllers/login.controller");

const router = Router();
router.post("/verify", callback.verifyCredentials);
module.exports = router;
