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
        type:String,
        required:true,
        unique:true,
        match:/^\+?(88)?0?1[3456789][0-9]{8}\b/
        

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