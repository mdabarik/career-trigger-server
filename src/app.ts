import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import route from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    console.log('Home Route');
    res.send({ status: true, message: 'Home page' });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
