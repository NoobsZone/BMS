const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
    productName:{
        type:String,
        required: [true, 'must provide name'],
        trim: true,

    },
    category:{
        type:String,
        required: [true, 'must provide category'],
    },
    brandName:{
        type:String,
        required: [true, 'must provide brand name']
    },
    price:{
        type:Number,
        required:[true,'must provide price']
    },
    images:{
        type:String,
        required: [true,'must provide product image!']
    },



})

module.exports =mongoose.model('Product', ProductSchema);