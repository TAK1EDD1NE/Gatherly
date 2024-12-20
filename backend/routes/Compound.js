import { join_as_admin , get_admin } from "../controllers/Admin.js"
import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { createCompound } from "../controllers/Compound.js";
const compoundRoutes = express.Router()

compoundRoutes.post('/create', auth_token(ROLES.admin), createCompound)

export default compoundRoutes