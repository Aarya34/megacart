import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; 
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';

dotenv.config();

connectDB(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});