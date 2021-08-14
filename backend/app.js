import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import authRoutes from './routes/auth'
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors({credentials: 'same-origin'}));


//middleware
app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);


//connections
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected')
})




const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})