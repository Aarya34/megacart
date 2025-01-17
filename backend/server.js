import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js'; 
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config()

connectDB(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your frontend URL
  credentials: true,
}))

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload',uploadRoutes);
app.get('/api/config/paypal', (req, res) => res.send({clientId:process.env.PAYPAL_CLIENT_ID}));
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}
else{
  app.get('/', (req, res) => {
    res.send('Server is ready');
  });
}
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});