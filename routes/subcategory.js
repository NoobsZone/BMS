const express = require("express");
const router = express.Router();
const { getAllSubcategory } = require("../controllers/subcategory");

router.route("/")
      .get(getAllSubcategory);

module.exports = router;
