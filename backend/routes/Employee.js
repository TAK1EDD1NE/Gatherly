import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { createEmployee, deleteEmployee } from "../controllers/Employee.js";

const employeeRoutes = express.Router()

employeeRoutes.post('/create', createEmployee)
employeeRoutes.delete('/delete/:id', deleteEmployee)
export default employeeRoutes