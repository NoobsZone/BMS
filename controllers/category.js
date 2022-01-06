const Category = require("../models/Category");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../middleware/error-handler");
const { response } = require("express");

// get All Products

const getAllCategory = asyncWrapper(async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
});

//create new Product

const createCategory = asyncWrapper(async (req, res, next) => {
  let category = new Category({
    name: req.body.name,
    details: req.body.details,
  });
  console.log(req.body);
  category
    .save()
    .then((response) => {
      res.json({
        message: "Category Created Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
  // const product = await Product.create(req.body);
  // res.status(201).json({ product });
});
// get specific Product
const getCategory = asyncWrapper(async (req, res, next) => {
  const { id: categoryID } = req.params;
  const category = await Category.findById({ _id: categoryID });
  if (!category) {
    return next(createCustomError(`No Category with id : ${categoryID}`, 404));
  }
  res.status(200).json({ category });
});

//delete product

const deleteCategory = asyncWrapper(async (req, res, next) => {
  const { id: categoryID } = req.params;
  const category = await Category.findOneAndDelete({ _id: categoryID });
  if (!category) {
    return next(createCustomError(`No Category with id : ${categoryID}`, 404));
  }
  res.status(200).json(category);
});

// //update Category

const updateCategory = asyncWrapper(async (req, res, next) => {
  const { id: categoryID } = req.params;
  const category = await Category.findOneAndUpdate(
    { _id: categoryID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    return next(createCustomError(`No Category with id : ${categoryID}`, 404));
  }
  res.status(200).json(category);
});

module.exports = {
  getAllCategory,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
