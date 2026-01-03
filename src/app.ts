import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    console.log('Home Route');
    res.send({ status: true, message: 'Home page' });
});

export default app;
