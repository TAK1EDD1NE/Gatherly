import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { assignTask, assignToEvent, createEmployee, deleteEmployee, getEmployeeEventTasks, removeTask } from "../controllers/Employee.js";

const employeeRoutes = express.Router()

employeeRoutes.post('/create', createEmployee)
employeeRoutes.delete('/delete/:id', deleteEmployee)
employeeRoutes.post('/assign-guest-event', assignToEvent)
employeeRoutes.post('/task/create', assignTask)
employeeRoutes.get('/task/get/:employee_id/:event_id', getEmployeeEventTasks)
employeeRoutes.delete('/task/delete/:task_id', removeTask)
export default employeeRoutes