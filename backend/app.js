import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/errorHandler.js'



dotenv.config()

const app = express()

const port = process.env.PORT || 5000

// middlewares
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false}))
app.use(cookieParser())

