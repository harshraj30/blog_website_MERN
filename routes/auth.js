const express = require('express');
const { login, register, logout,profile } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout);
router.get("/profile",profile);

module.exports = router;
