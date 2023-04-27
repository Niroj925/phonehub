import express from  "express"
import cors from "cors"
import axios from "axios"
import connectDB from './config/db_conn.js';
import userRoute from './route/userRoute.js';
import productRoute from './route/productRoute.js';
import orderRoute from './route/orderRoute.js';
// import orderItemRoute from './route/orderItemRoute.js';
import reviewRoute from  './route/reviewRoute.js';
import "dotenv/config"



const app=express();


app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/order',orderRoute);
// app.use('/api/orderitem',orderItemRoute);
app.use('/api/review',reviewRoute);


app.get('/api',async(req,res)=>{
    res.send('api call successfully')
})

app.listen(8080,(req,res)=>{
    console.log('backend is running ');
})