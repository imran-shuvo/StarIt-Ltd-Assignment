const jwt = require('jsonwebtoken');
const librarian = require('../models/librarian');
const Librarian = require('../models/librarian');



const authLibrarian = async (req,res,next)=>{


    try{
           
            const token = req.headers["authorization"]
            const id =  jwt.verify(token,'black sheep')
           
            lib = await Librarian.findOne({_id:id,'tokens.token':token})

            if(!lib){
                throw new Error()
            }
            if(lib)
             {
                if(lib['access']=='no'){
                    throw new Error()
                }

             }


            next()
        }catch(e){
            res.status(404).send({error:"authentication failed you must be librarain"})

        }


}


module.exports = authLibrarian

