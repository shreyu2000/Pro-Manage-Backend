const express =  require('express');
const app =  express();
const cors =  require('cors');
const connectDB = require('./db/dbconnect.js')
require('dotenv').config();

//database connection
connectDB();

//middlewares
//1.CORS
app.use(cors());

//2. EXPRESS
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))


//Health api
app.get("/api/v1/health" ,(req,res)=>{
    res.status(200).json({
        status: "active",
        service: "Pro Manage",
        time: new Date(),
    })
})

//routers
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks" ,taskRoutes);


const PORT = process.env.PORT || 4000;
app.listen( PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})


