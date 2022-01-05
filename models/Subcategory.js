const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    subcatname: {
        required: true,
        type: String,
        unique: true
    },
    category:[],
})

module.exports =  mongoose.model('Subcategory', SubcategorySchema)