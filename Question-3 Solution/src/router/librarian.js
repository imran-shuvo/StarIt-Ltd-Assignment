const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const authlib = require('../middlewire/auth.lib');
const { update } = require('../models/librarian');

const Librarian= require('../models/librarian');


const librarianRouter = new express.Router();



librarianRouter.post('/add',async (req,res)=>{
    try{
        
        const librarian =  new Librarian(req.body)     
        await librarian.save()
        const token =  librarian.generateAuthToken();
        res.status(200).send(librarian)

    }catch(e){
        res.status(404).send({error:'try again!error occruing while add librarian'})
    }

})



librarianRouter.get('/detail/:mobileNumber',authlib,async(req,res)=>{
    try{

        const mobileNumber = req.params.mobileNumber
        const lib =await Librarian.findOne({mobileNumber})
        if(!lib||lib['access']=='no')
            throw new Error({error:'can not find librarian'});
        res.status(200).send(lib)

    }catch(e){
        res.status(404).send({error:'can not find this librarian'})
    }
    
})

librarianRouter.patch('/update/:mobileNumber',authlib,async(req,res)=>{


    const mobileNumber = req.params.mobileNumber
    const lib = await Librarian.findOne({mobileNumber})
    if(!lib||lib['access']=='no')
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
            lib[update] = req.body[update];
    
        })
        await  lib.save();
        res.status(201).send(lib)

    }catch(e){
        res.status(404).send({error:'update is not allowed'})

    }
      
})



librarianRouter.delete('/delete/:mobileNumber',authlib,async (req,res)=>{
    try{
        const mobileNumber = req.params.mobileNumber
        const lib =await Librarian.findOne({mobileNumber})
        if(!lib||lib['access']=='no')
             throw new Error();
        lib['access'] = 'no'
        await lib.save()
        res.status(200).send({done:'successfully delete Librarian'})

    }catch(e){
        res.status(404).send({error:"can not delete this Librarian"})
    }
    
})



module.exports = librarianRouter