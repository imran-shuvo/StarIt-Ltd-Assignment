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
                throw new Error({})
            }
            if(student){
                if(!student['access']=='no')
                  throw new Error({})

            }
            if(librarian){
                if(!librarian['access']=='no')
                     throw new Error({})

            }
            
            
            

          

            next()
        }catch(e){
            res.status(404).send({error:"authentication failed you must be a student or librarian"})

        }


}


module.exports = authLibStu

