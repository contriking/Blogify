const express = require('express')
const path=require('path')
const cors=require('cors')
const {connect} = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {errorHandler} = require('./middleware/error')

const app=express();
const dirname=path.resolve();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({credentials : true , origin: "http://localhost:5173"}))

app.use(upload())  
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.use(errorHandler);

app.use(express.static(path.join(__dirname,"../client/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client","dist","index.html"))
})


connect(process.env.MONGO_URI).
    then(
        app.listen(process.env.PORT || 5000, () => { 
            console.log(`Server running on port ${process.env.PORT}`)}
        )
    )
    .catch(
        error => console.log(error)
    );

