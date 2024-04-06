const express=require('express')
const app=new express()

const morgan=require('morgan')
const cors=require('cors')

require('dotenv').config()
require('./DB/connection')
const userRoute=require('./Routes/userRoutes')
const postRoute=require('./Routes/postRoute')

const PORT=process.env.PORT

//for deployment
const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));

app.use(morgan('dev'))

app.use(cors())
app.use('/api',userRoute)
app.use('/api',postRoute)

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html')); })

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)  
})   