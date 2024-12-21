import express from 'express'
import ROLES from '../lib/roles.js'
import { getNotifications, seenNotification } from '../controllers/Notification.js'
import { auth_token } from '../middleware/auth.js'

const notificationRoutes = express.Router()

notificationRoutes.get('/', auth_token(ROLES.all), getNotifications)
notificationRoutes.patch('/seen', auth_token(ROLES.all), seenNotification)

export default notificationRoutes