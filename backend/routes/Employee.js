import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { assignToEvent, createEmployee, deleteEmployee } from "../controllers/Employee.js";

const employeeRoutes = express.Router()

employeeRoutes.post('/create', createEmployee)
employeeRoutes.delete('/delete/:id', deleteEmployee)
employeeRoutes.post('/assign-guest-event', assignToEvent)

export default employeeRoutes