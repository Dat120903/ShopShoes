const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const fumee = require("../controllers/fumeeAuthController");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);
router.post("/fumee-login", fumee.fumeeLogin);


module.exports = router;
