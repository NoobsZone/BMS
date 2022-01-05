const Category = require("../models/Category");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../middleware/error-handler");
const { response } = require("express");

//get all category

const getAllCategory = asyncWrapper(async (req, res) => {
  const allCategory = await Category.find();
  res.status(200).json({
    allCategory
  });
});

// const createCategory = asyncWrapper(async (req, res, next) => {
//   const cat = new Category({
//     categoryName: req.body.categoryName,
//   });
//   await cat.save((err, data) => {
//     res.status(200).json({
//       code: 200,
//       message: "Category Created Successfully!",
//       addCategory: data,
//     });
//   });
//   // const product = await Product.create(req.body);
//   // res.status(201).json({ product });
// });
const createCategory = asyncWrapper(async(req,res) => {
    const category = new Category({
        categoryName: req.body.categoryName
    })
    await category.save()
    .then(response =>{
        res.json({
            message: 'Category Created Successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred!'
        })
    })
})

// const createCategory = asyncWrapper(async(req,res,next) => {
//     const cat = await Category.create(req.body);
//     res.status(200).json({cat});
// })


module.exports = {
  getAllCategory,
  createCategory,
};
