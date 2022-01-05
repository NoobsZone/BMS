const Category = require("../models/Category");
const asyncWrapper = require("../middleware/async");
const {createCustomError}= require('../middleware/error-handler');
const { response } = require("express");

const getAllSubcategory = asyncWrapper(async (req, res) => {
    const allSubCats = await Category.find();
    res.status(200).json({ allSubCats });
  });

module.exports = {
    getAllSubcategory
}