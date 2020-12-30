const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req,res,next)=>{


    try{
           
            const token = req.headers["authorization"]
            const id =  jwt.verify(token,'token generator by imran')
            user = await User.findOne({_id:id,'tokens.token':token})
            if(!user){
                throw new Error({error:"please login first"})
            }
            req.user  = user;
            req.token = token;
            next()
        }catch(e){
            res.status(404).send({error:e})

        }


}


module.exports = auth

