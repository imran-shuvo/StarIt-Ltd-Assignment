const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');



studentSchema = new mongoose.Schema({
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

studentSchema.methods.generateAuthToken = async function(){
    let student = this;
    let token = jwt.sign({_id:student._id.toString()},'black sheep');
    student.tokens.push({token})
    await student.save();
    return token;
}




const student = mongoose.model('Student',studentSchema)
module.exports = student;