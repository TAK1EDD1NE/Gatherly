import express from 'express'
import access from '../middlewares/auth.js'
import ROLES from '../utils/roles.js'
import { getNotifications, seenNotification } from '../controllers/notifications.js'

const notificationRoutes = express.Router()

notificationRoutes.get('/', access(ROLES.all), getNotifications)
notificationRoutes.patch('/seen', access(ROLES.all), seenNotification)

export default notificationRoutes