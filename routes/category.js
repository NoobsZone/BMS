const express = require("express");
const router = express.Router();
const {
    getAllCategory,
    createCategory
}= require('../controllers/category')

router.route('/')
      .get(getAllCategory)
      .post(createCategory)

module.exports = router;