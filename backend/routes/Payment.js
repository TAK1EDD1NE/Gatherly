import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { create_payment, getPayments } from '../controllers/Payment.js'
const paymentRoutes = express.Router()

paymentRoutes.post('/create', auth_token(ROLES.admin), create_payment)
paymentRoutes.get('/get/:event_id', auth_token(ROLES.all), getPayments)
export default paymentRoutes