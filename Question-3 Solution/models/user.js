const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        
    },
    number:{
        type:Number,
        required:true,
        unique:true
        

    },
    role:{
        type:String,
        validate(value){
            if(!(value==="student"||value==="librarian"))
                 throw new Error({error:'role must be student or librarian'})
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true

        }


    }]
})

userSchema.methods.generateAuthToken = async function(){
    let user = this;
    let token = jwt.sign({_id:user._id.toString()},'token generator by imran');
    user.tokens.push({token})
    await user.save();
    return token;
}




const User = mongoose.model('user',userSchema)
module.exports = User;