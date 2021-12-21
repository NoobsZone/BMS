const Product = require("../models/Product");
const asyncWrapper = require("../middleware/async");
const {createCustomError}= require('../middleware/error-handler');
// const { response } = require("express");

// get All Products

const getAllProducts = asyncWrapper(async (req, res) => {
  const allProducts = await Product.find();
  res.status(200).json({ allProducts });
});

//create new Product

const createProduct = asyncWrapper(async (req, res, next) => {
  let product = new Product({
    productName:req.body.productName,
    category:req.body.category,
    brandName:req.body.brandName,
    price:req.body.price,
  })

  //Single File

  if(req.file){
    product.images=req.file.path
  }
//Multiple Files

  if(req.files){
    let path = '';
    req.files.forEach(function(files,index,arr){
      path=path+files.path + ','
    })
    path = path.substring(0, path.lastIndexOf(","))
    product.images= path;
  }
  product.save()
  .then(response =>{
    res.json({
      message:'Product Created Successfully!'
    })
  })
  .catch(error =>{
    res.json({ 
      message:'An error occurred!'
    })
  })
  // const product = await Product.create(req.body);
  // res.status(201).json({ product });
});
// get specific Product
const getProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findById({ _id: productID });
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
