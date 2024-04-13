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

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

//admin routes
router.get("/", authMiddleware(roleMap("GET_ADMIN_LIST")), catchAsync(getAdminList));
router.post("/", authMiddleware(roleMap("CREATE_ADMIN")), validateUser, catchAsync(createAdmin));
router.put("/:id", authMiddleware(roleMap("UPDATE_ADMIN")), validateUser, catchAsync(updateAdmin));
router.delete("/:id",  authMiddleware(roleMap("DELETE_ADMIN")), catchAsync(deleteAdmin));

module.exports = router;
