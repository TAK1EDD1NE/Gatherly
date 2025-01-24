import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { createReservation, handlePaymentSuccess } from '../controllers/Reservation.js';
const reservationRoute = express.Router()

reservationRoute.post('/create', auth_token(ROLES.all), createReservation)
reservationRoute.get('/handle-payement', auth_token(ROLES.user), handlePaymentSuccess)
export default reservationRoute