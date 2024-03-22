const express = require('express');
const { login, register, logout,profile , getSession } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.get("/user/:username",getSession);
router.post("/login", login);
router.post("/logout",logout);
router.get("/profile",profile);

module.exports = router;
