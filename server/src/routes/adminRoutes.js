const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateUser } = require("../middlewares");
const {
  getAdminList,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
//admin routes
router.get("/", catchAsync(getAdminList));
router.post("/", validateUser, catchAsync(createAdmin));
router.put("/:id", validateUser, catchAsync(updateAdmin));
router.delete("/:id", catchAsync(deleteAdmin));

module.exports = router;
