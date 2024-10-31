
const express = require('express');
const {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePostUser,
} = require("../controllers/user");

const router = express.Router();


router.route("/").get(handleGetAllUser).post(handlePostUser)


router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;