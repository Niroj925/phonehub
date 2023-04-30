import express from  "express"
import cors from "cors"
import connectDB from './config/db_conn.js';
import userRoute from './route/userRoute.js';
import productRoute from './route/productRoute.js';
import orderRoute from './route/orderRoute.js';
import reviewRoute from  './route/reviewRoute.js';

// import customerRoute from './route/customerRoute.js';
// import orderItemRoute from './route/orderItemRoute.js';
import "dotenv/config"
import bodyParser from 'body-parser'


const app=express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

connectDB();

app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/order',orderRoute);
// app.use('/api/orderitem',orderItemRoute);
app.use('/api/review',reviewRoute);
// app.use('/api/customer',customerRoute);

app.use('/public/image',express.static('./public/image'));

app.listen(8080,(req,res)=>{
    console.log('backend is running ');
})