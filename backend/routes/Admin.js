import { join_as_admin } from "../controllers/Admin.js"
import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'

const adminRoutes = express.Router()

adminRoutes.post('/join', auth_token(ROLES.user), join_as_admin)


export default adminRoutes