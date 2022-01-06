const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category");

router.route("/")
      .get(getAllCategory)
      .post(createCategory); //Multiple File
// .post(upload.upload.single('images'),createProduct) //Single File
router.route("/:id")
      .get(getCategory)
      .patch(updateCategory)
      .delete(deleteCategory);
module.exports = router;
