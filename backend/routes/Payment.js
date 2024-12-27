import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { create_payment } from '../controllers/payment.js';
const paymentRoutes = express.Router()

paymentRoutes.post('/create', auth_token(ROLES.admin), create_payment)

export default paymentRoutes