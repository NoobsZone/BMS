const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const { 
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}= require('../controllers/products');

router.route('/')
      .get(getAllProducts)
      .post(upload.upload.array('images'),createProduct) //Multiple File
      // .post(upload.upload.single('images'),createProduct) //Single File
router.route('/:id')
      .get(getProduct)
      .patch(updateProduct)   
      .delete(deleteProduct)
module.exports =router;