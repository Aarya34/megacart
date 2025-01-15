import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});