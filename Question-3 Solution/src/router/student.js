const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const authLibStu = require('../middlewire/auth.lib.stu');
const { update } = require('../models/student');

const Student = require('../models/student');


const studentRouter = new express.Router();



studentRouter.post('/add',async (req,res)=>{
    try{
        
        const student =  new Student(req.body)     
        await student.save()
        const token =  student.generateAuthToken();
        res.status(200).send(student)

    }catch(e){
        res.status(404).send({error:'try again'})
    }

})



studentRouter.get('/me',authLibStu,async(req,res)=>{
    try{

        res.send(req.user)

    }catch(e){
        res.status(404).send(e)
    }
    
})

studentRouter.patch('/me/update',authLibStu,async(req,res)=>{
    const allowedUpdates = ['name'];
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((update)=> {
        return allowedUpdates.includes(update);
    });
   
    if(!isAllowed)
        res.status(404).send({error:'update is not allowed'})

    try{
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
    
        })
        await  req.user.save();
        res.send(req.user)

    }catch(e){
        res.status(404).send({error:'update is not allowed'})

    }
      
})



studentRouter.delete('/me/delete',authLibStu,async (req,res)=>{
    try{
        req.user.remove();
        res.status(200).send({done:'successfully delete user'})

    }catch(e){
        res.status(404).send({error:"try again please"})
    }
    
})



module.exports = studentRouter