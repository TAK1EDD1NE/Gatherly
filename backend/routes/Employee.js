import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { createEmployee } from "../controllers/Employee.js";

const employeeRoutes = express.Router()

employeeRoutes.post('/create', createEmployee)

export default employeeRoutes