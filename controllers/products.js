const Product = require("../models/Product");
const asyncWrapper = require("../middleware/async");
// const {createCustomError}= require('../middleware/error-handler');

// get All Products

const getAllProducts = asyncWrapper(async (req, res) => {
  const allProducts = await Product.find();
  res.status(200).json({ allProducts });
});
//create new Product
const createProduct = asyncWrapper(async (req, res, next) => {
  let product = new Product({
    
  })
  // const product = await Product.create(req.body);
  // res.status(201).json({ product });
});
// get specific Product
const getProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    return next(createCustomError(`No Product with id : ${productID}`, 404));
  }
  res.status(200).json({ product });
});
//delete product
const deleteProduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await Product.findOneAndDelete({ _id: productID });
    if(!product) {
        return next(createCustomError(`No Product with id : ${productID}`, 404));
    }
  res.status(200).json(product);
});

//update product
const updateProduct = asyncWrapper (async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await Product.findOneAndUpdate({_id: productID},req.body,{
        new: true,
        runValidators: true,
    });
    if(!product) {
        return next(createCustomError(`No Product with id : ${productID}`, 404));
    }
    res.status(200).json(product);
});
module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
