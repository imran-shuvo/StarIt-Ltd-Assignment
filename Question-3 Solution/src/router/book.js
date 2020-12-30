const express = require('express');
const router = require('./user');
const Book = require('../models/book');
const { response } = require('express');
const { update } = require('../models/book');
const bookRouter = express.Router();
const auth = require('../middlewire/auth');



bookRouter.get('',async(req,res)=>{
    try{
        
        const books = await Book.aggregate([{"$project":{ "_id":1,"title":1,"author":1}}]).limit(5);
        // const books = await Book.find({});
        
        res.status(200).send(books)

    }catch(e){
        res.status(404).send({error:'error!!!no books here '})
    }
    

})






bookRouter.post('/add/',auth,async(req,res)=>{
    try{
        const book = new Book(req.body);
        await book.save();
        res.send(book)

    }catch(e){
        res.status.send({error:'error!!!while adding book'})
    }
    

})

bookRouter.get('/detail/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const book =await Book.findOne({_id});

        if(!book)
            throw new Error();
        res.status(201).send(book)

    }catch(e){
        res.status(404).send({error:'book not found'})
    }
    
})

bookRouter.patch('/edit/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id;
        const updates = Object.keys(req.body)
        const book =await Book.findOne({_id});        
        if(!book)
            throw new Error();

        updates.forEach((update)=>{
            book[update] = req.body[update];
        })
        await book.save();
        res.status(201).send(book)

    }catch(e){
        res.status(404).send({error:'please login first'})
    }
    
})
bookRouter.delete('/delete/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id;
        const book =await Book.findOne({_id});
        if(!book)
            throw new Error();
        await book.remove()
        res.status(201).send({done:"successfully delete book"})

    }catch(e){
        res.status(404).send({error:'error!!!book cannot delete'})
    }
    
})







module.exports = bookRouter;