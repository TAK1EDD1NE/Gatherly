import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import cookieParser from "cookie-parser"
//import errorHandler from './middlewares/errorHandler.js'
import pool from '../backend/lib/db.js'
import errorHandler from '../backend/middleware/errorHandler.js'
import userRoutes from './routes/User.js'
import adminRoutes from './routes/Admin.js'
import compoundRoutes from './routes/Compound.js'
import notificationRoutes from './routes/Notification.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

// middlewares
//app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false}))
app.use(cookieParser())


// connect to start server
try {
    app.listen(port, async () => {
      console.log('server runing on port ' + port)
    })
  
  } catch (err) {
    console.log('Error of Connection to DB', err)
  }


app.use('/api/user/',userRoutes)
app.use('/api/admin/', adminRoutes)
app.use('/api/compound/', compoundRoutes)
app.use('/api/notification/', notificationRoutes)
app.use(errorHandler)
export default app