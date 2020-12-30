const express = require('express');
const app = express();
const cors = require('cors');
require('./db/mongoose');

const studentRouter = require('./router/student')
const librarianRouter = require('./router/librarian')
const bookRouter = require('./router/book')

const port = process.env.port||3000


app.use(express.json());
app.use(cors())


app.use('/student/',studentRouter);
app.use('/book/',bookRouter)
app.use('/librarian/',librarianRouter);



app.listen(port,()=>{
    console.log(`server is Running ${port}`)
})