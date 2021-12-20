const express = require("express");
const router = express.Router();

// const productsController= require('../controllers/products');
const upload = require('../middleware/upload');

// console.log("upolad: ", typeof upload, " ", upload);

// router.get(productsController.getAllProducts)
// router.post(upload.upload.single('image'), productsController.createProduct)
//upload.single('image'),


const { 
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}= require('../controllers/products');

router.route('/')
      .get(getAllProducts)
      .post(upload.upload.single('images'),createProduct)
router.route('/:id')
      .get(getProduct)
      .patch(updateProduct)
      .delete(deleteProduct)
module.exports =router;