const express = require('express');
const app = express();
const cors = require('cors');
require('./db/mongoose');
const libRouter = require('./router/librarian')
const stuRouter = require('./router/student')
const bookRouter = require('./router/book')
const port = process.env.port||3000


app.use(express.json());
app.use(cors())

app.use('/librarian/',libRouter);
app.use('/student/',stuRouter)
app.use('/book/',bookRouter)


app.listen(port,()=>{
    console.log(`server is Running ${port}`)
})