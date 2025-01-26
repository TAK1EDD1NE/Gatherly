import express from 'express';
// import access from '../middlewares/auth.js';
// import ROLES from '../utils/roles.js'
import { signup, login , signout, get_user_by_id , update_name,update_password,update_photo, remove, request_reset} from '../controllers/User.js';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'

const userRoutes = express.Router()
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user
 *     description: This endpoint logs in a user by accepting their credentials.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 */
userRoutes.post('/login', login)
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Signs up a new user
 *     description: This endpoint allows a new user to sign up by providing their credentials.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               photo:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: User successfully signed up
 *       400:
 *         description: Invalid data
 */
userRoutes.post('/signup', signup)
/**
 * @swagger
 * /users/signout:
 *   get:
 *     summary: Signs out a user
 *     description: This endpoint allows a user to log out from the system.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully signed out
 */
userRoutes.get('/signout', signout)
/**
 * @swagger
 * /users/get-user-by-id/{user_id}:
 *   get:
 *     summary: Retrieves a user by ID
 *     description: This endpoint retrieves a user's details using their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details successfully retrieved
 *       404:
 *         description: User not found
 */
userRoutes.get('/get-user-by-id',auth_token(ROLES.all), get_user_by_id)
/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Deletes the currently authenticated user
 *     description: This endpoint deletes the currently authenticated user's account.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       403:
 *         description: Unauthorized access
 */
userRoutes.delete('/delete', auth_token(ROLES.all),  remove)
/**
 * @swagger
 * /users/update-name:
 *   patch:
 *     summary: Updates the user's name
 *     description: This endpoint allows the user to update their name.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Name successfully updated
 *       400:
 *         description: Invalid name
 */
userRoutes.patch('/update-name',auth_token(ROLES.all), update_name)
/**
 * @swagger
 * /users/update-photo:
 *   patch:
 *     summary: Updates the user's photo
 *     description: This endpoint allows the user to update their profile photo.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - photo
 *     responses:
 *       200:
 *         description: Photo successfully updated
 *       400:
 *         description: Invalid photo
 */
userRoutes.patch('/update-photo',auth_token(ROLES.all), update_photo)
/**
 * @swagger
 * /users/update-password:
 *   patch:
 *     summary: Updates the user's password
 *     description: This endpoint allows the user to update their password.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *             required:
 *               - old_password
 *               - new_password
 *     responses:
 *       200:
 *         description: Password successfully updated
 *       400:
 *         description: Invalid password
 */
userRoutes.patch('/update-password',auth_token(ROLES.all), update_password)
/**
 * @swagger
 * /users/reset:
 *   patch:
 *     summary: Requests a password reset
 *     description: This endpoint allows a user to request a password reset.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset request sent
 *       400:
 *         description: Invalid email address
 */
userRoutes.patch('/reset', request_reset)

export default userRoutes