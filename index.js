const express = require('express');
const dotenv = require('dotenv');
const {databaseConnection} = require("./utils/database");
const cookieParser = require('cookie-parser');
const {router} =require('./routes/userRoute')
const app = express();
const cors = require('cors');

databaseConnection();
dotenv.config({
    path:".env"
})
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use(cors( {
    origin: 'http://localhost:3000',
    credentials: true
}));


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"This is backend",
        success: true
    })
})
app.use("/api/v1/user",router);

app.listen(process.env.PORT,()=>{
    console.log(`server listen to ${process.env.PORT}`);
})