const express = require('express');
const router = require('./student');
const Book = require('../models/book');
const { response } = require('express');
const { update } = require('../models/book');
const bookRouter = express.Router();
const authlib = require('../middlewire/auth.lib');
const authLibStu = require('../middlewire/auth.lib.stu')


bookRouter.post('/add/',authlib,async(req,res)=>{
    try{
        const book = new Book(req.body);
        await book.save();
        res.send(book)

    }catch(e){
        res.status.send({error:'error!!!while adding book'})
    }
    

})

bookRouter.get('/detail/:value',authLibStu,async(req,res)=>{
    try{
      
        const bookName = req.params.value;
        const author = req.params.value;
        console.log(req.params.value)
       
        const book1 = await Book.findOne({bookName})
        const book2 = await Book.findOne({author})

        
        
        if(book1){
            if(book1['access']=='no')
                throw new error()

            res.status(201).send(book1)

        }
           
        
        if(book2){
            if(book2['access']=='no')
                throw new error()
            res.status(201).send(book2)

        }
            
        
        if(!book1||!book2)
            throw new error()

        

    }catch(e){
        res.status(404).send({error:'book not found'})
    }
    
})

bookRouter.patch('/update/:bookName',authlib,async(req,res)=>{
    try{
        const bookName = req.params.bookName;
        const updates = Object.keys(req.body)
        const book =await Book.findOne({bookName});        
       
        if(!book||book['access']=='no')
            throw new Error({});
        else{

        updates.forEach((update)=>{
            book[update] = req.body[update];
        })
        await book.save();
        res.status(201).send(book)}

    }catch(e){
        res.status(404).send({error:'cannot update this book'})
    }
    
})
bookRouter.delete('/delete/:bookName',authlib,async(req,res)=>{
    try{
        const bookName = req.params.bookName;
        const book =await Book.findOne({bookName});
        
        if(!book||book['access']=='no')
            throw new Error();
        
        book['access'] = 'no';
        await book.save()
        res.status(201).send({done:"successfully delete book"})

    }catch(e){
        res.status(404).send({error:'error!!!book cannot delete'})
    }
    
})




module.exports = bookRouter;