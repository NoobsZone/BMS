const Category = require("../models/Category");
const asyncWrapper = require("../middleware/async");
const {createCustomError}= require('../middleware/error-handler');
const { response } = require("express");

//get all category

const getAllCategory = asyncWrapper(async(req,res) => {
    const allCategory = await Category.find();
    res.status(200).json({
        allCategory
    });
})

const createCategory = asyncWrapper(async(req,res,next) => {
    let category = new Category({
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

module.exports = {
    getAllCategory,
    createCategory
}