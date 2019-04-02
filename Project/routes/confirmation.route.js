import { Router } from "express";

const callback = require("../controllers/confirmation.controller");

const router = Router();
router.get("/:token", callback.confirm);
module.exports = router;
