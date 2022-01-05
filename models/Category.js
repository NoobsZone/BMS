const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required: [true, 'Must Provide Category Name'],
        trim: true
    }
})

module.exports = mongoose.model('Category', CategorySchema);