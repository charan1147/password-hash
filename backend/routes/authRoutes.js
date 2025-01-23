const express = require("express");
const {addUser,requestReset,validateReset,resetPassword,} = require("../controllers/authController");

const router = express.Router();

router.post("/new-user",addUser)
router.post("/request-reset", requestReset);
router.get("/validate-reset/:token", validateReset);
router.post("/reset-password", resetPassword);


module.exports = router;




