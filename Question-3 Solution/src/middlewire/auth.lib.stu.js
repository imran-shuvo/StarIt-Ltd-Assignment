const jwt = require('jsonwebtoken');
const Student = require('../models/student')
const Lib = require('../models/librarian');





const authLibStu = async (req,res,next)=>{


    try{
           
            const token = req.headers["authorization"]
            
            const id =  jwt.verify(token,'black sheep')
            student = await Student.findOne({_id:id,'tokens.token':token})
            librarian = await Lib.findOne({_id:id,'tokens.token':token})
            
            
            if(!student&&!librarian){
                throw new Error({error:"please login first"})
            }
          

            next()
        }catch(e){
            res.status(404).send({error:"error get"})

        }


}


module.exports = authLibStu

