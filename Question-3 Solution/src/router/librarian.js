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
        res.status(404).send({error:'try again'})
    }

})



librarianRouter.get('/me',authlib,async(req,res)=>{
    try{

        res.send(req.user)

    }catch(e){
        res.status(404).send(e)
    }
    
})

librarianRouter.patch('/me/update',authlib,async(req,res)=>{
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



librarianRouter.delete('/me/delete',authlib,async (req,res)=>{
    try{
        req.user.remove();
        res.status(200).send({done:'successfully delete user'})

    }catch(e){
        res.status(404).send({error:"try again please"})
    }
    
})



module.exports = librarianRouter