import express from 'express';
// import access from '../middlewares/auth.js';
// import ROLES from '../utils/roles.js'
import { signup, login ,signout} from '../controllers/User.js';

const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.post('/signup', signup)
userRoutes.get('/signout', signout)


export default userRoutes