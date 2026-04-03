const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
const asyncwrapper = require("../utils/asyncwrapper");

// const login = require("../controls/login");
const add = require("../controls/add");
const show = require("../controls/show");
// const register = require("../controls/register");

// router.post("/login", asyncwrapper(login));
// router.post("/register", asyncwrapper(register));

// router.post("/add", auth, asyncwrapper(add));
router.post("/add", asyncwrapper(add));
// router.get("/show", auth, asyncwrapper(show));
router.get("/show", asyncwrapper(show));

module.exports = router;
