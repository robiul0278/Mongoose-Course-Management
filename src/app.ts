// const express = require('express')
import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
// const port = 3000

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api', router);

app.use(globalErrorHandler);
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment-3 running...!')
})

export default app;
