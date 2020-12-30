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



studentRouter.get('/detail/:mobileNumber',authLibStu,async(req,res)=>{
    try{

        const mobileNumber = parseInt(req.params.mobileNumber)
        const stu =await Student.findOne({mobileNumber})
        if(!stu||stu['access']=='no')
            throw new Error({error:'can not find librarian'});
        res.status(200).send(stu)

    }catch(e){
        res.status(404).send({error:'can not find this student'})
    }
    
})

studentRouter.patch('/update/:mobileNumber',authLibStu,async(req,res)=>{
    const mobileNumber = parseInt(req.params.mobileNumber)
   
    const stu = await Student.findOne({mobileNumber})
    if(!stu||stu['access']=='no')
        throw new Error();

    const allowedUpdates = ['name','mobileNumber'];
    const updates = Object.keys(req.body);

    const isAllowed = updates.every((update)=> {
        return allowedUpdates.includes(update);
    });
   
    if(!isAllowed)
        res.status(404).send({error:'update is not allowed'})

    try{
        updates.forEach((update)=>{
            stu[update] = req.body[update];
    
        })
        await  stu.save();
        res.status(201).send(stu)

    }catch(e){
        res.status(404).send({error:'update is not allowed'})

    }
      
})



studentRouter.delete('/delete/:mobileNumber',authLibStu,async (req,res)=>{
    try{
        const mobileNumber = parseInt(req.params.mobileNumber)
        const stu = await Student.findOne({mobileNumber})
        if(!stu||stu['access']=='no')
          throw new Error();
        stu['access'] = 'no'
        await stu.save()
        res.status(200).send({done:'successfully delete Student'})

    }catch(e){
        res.status(404).send({error:"can not delete this Student"})
    }
    
})



module.exports = studentRouter