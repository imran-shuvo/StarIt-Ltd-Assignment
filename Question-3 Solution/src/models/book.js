const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');





const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        required:true,
        trim:true
        
    },
    author:{
       type:String,
       required:true,
       trim:true
        
    },
    price:{
        type:Number,
        required:true
    

    },
    date:{
        type:Date,
        default:Date.now
    
    },
    access:{
        type:String,
        default:'yes'

    }

   
    

})


const Book = mongoose.model('Book',bookSchema);

module.exports = Book;