const jwt = require('jsonwebtoken');
const Student = require('../models/student')
const Librarian = require('../models/librarian');



const authLibStu = async (req,res,next)=>{


    try{
           
            const token = req.headers["authorization"]
            const id =  jwt.verify(token,'black sheep')
            student = await Student.findOne({_id:id,'tokens.token':token})
            librarian = await Librarian.findOne({_id:id,'tokens.token':token})

            if(!student||!librarian){
                throw new Error({error:"please login first"})
            }
            if(student)
                req.user  = student;
                
            if(librarian)
                req.user  = librarian;

            req.token = token;

            next()
        }catch(e){
            res.status(404).send({error:e})

        }


}


module.exports = authLibStu

