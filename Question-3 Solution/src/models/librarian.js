const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');



librarianSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
        

    },
    tokens:[{
        token:{
            type:String,
            required:true

        }


    }],
    access:{
        type:String,
        default:'yes'
    }
})

librarianSchema.methods.generateAuthToken = async function(){
    let librarian = this;
    let token = jwt.sign({_id:librarian._id.toString()},'black sheep');
    librarian.tokens.push({token})
    await librarian.save();
    return token;
}




const librarian = mongoose.model('Librarian',librarianSchema)
module.exports = librarian;