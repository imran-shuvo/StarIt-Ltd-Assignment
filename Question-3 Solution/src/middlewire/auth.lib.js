const jwt = require('jsonwebtoken');
const Librarian = require('../models/librarian');



const authLibrarian = async (req,res,next)=>{


    try{
           
            const token = req.headers["authorization"]
            const id =  jwt.verify(token,'black sheep')
           
            librarian = await Librarian.findOne({_id:id,'tokens.token':token})

            if(!librarian){
                throw new Error({error:"please login first"})
            }
          
           
            req.user  = librarian;
            req.token = token;

            next()
        }catch(e){
            res.status(404).send({error:e})

        }


}


module.exports = authLibrarian

