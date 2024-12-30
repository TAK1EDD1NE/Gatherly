import express from 'express';
// import access from '../middlewares/auth.js';
// import ROLES from '../utils/roles.js'
import { signup, login , signout, get_user_by_id , update_name,update_password,update_photo, remove, request_reset} from '../controllers/User.js';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'

const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.post('/signup', signup)
userRoutes.get('/signout', signout)
userRoutes.get('/get-user-by-id/:user_id',auth_token(ROLES.all), get_user_by_id)
userRoutes.delete('/delete', auth_token(ROLES.all),  remove)
userRoutes.patch('/update-name',auth_token(ROLES.all), update_name)
userRoutes.patch('/update-photo',auth_token(ROLES.all), update_photo)
userRoutes.patch('/update-password',auth_token(ROLES.all), update_password)
userRoutes.patch('/reset', request_reset)

export default userRoutes