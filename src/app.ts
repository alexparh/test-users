import 'reflect-metadata';
import * as express from 'express';
import container from './inversify/inversify.config';
import * as dotenv from 'dotenv';
import { createUserRouter } from './routes/user.route';
import { createAuthRouter } from './routes/auth.route';
import mongoose from 'mongoose';
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', createUserRouter(container));
app.use('/auth', createAuthRouter(container));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`App running on ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
