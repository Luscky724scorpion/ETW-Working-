require('dotenv').config()
const express=require('express')
const app=express()
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const entryRoutes=require('./routes/entry-routes')
const cors=require('cors')
const morgan=require('morgan')
const cookieParser=require("cookie-parser")
const feelings=require('./routes/feeling-routes') 


app.use('/',require('./routes/auth-routes'))

//connect to DB
const connectToDB=require('./db/centraldb')
const PORT=process.env.PORT||3000
connectToDB()


//middlewares
app.use(cors({ // You might configure CORS globally here too
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/create',entryRoutes)
app.use('/api/feels',feelings)

 

app.listen(PORT,()=>{
console.log('server is listening');}
)
