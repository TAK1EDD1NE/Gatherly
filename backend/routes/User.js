import express from 'express';
// import access from '../middlewares/auth.js';
// import ROLES from '../utils/roles.js'
import { signup, login , signout, get_user_by_id , remove} from '../controllers/User.js';
import { auth_token } from '../middleware/auth.js';
const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.post('/signup', signup)
userRoutes.get('/signout', signout)
userRoutes.get('/get-user-by-id/:user_id', get_user_by_id)
userRoutes.delete('/delete', auth_token,  remove)
export default userRoutes