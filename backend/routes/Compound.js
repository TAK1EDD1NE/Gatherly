import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { createCompound, deleteCompound, getCompoundById, searchCompounds } from "../controllers/Compound.js";
const compoundRoutes = express.Router()


/**
 * @swagger
 * /compounds/create:
 *   post:
 *     summary: Creates a new compound
 *     description: This endpoint is used by admins to create a new compound.
 *     tags:
 *       - Compounds
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
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *             required:
 *               - name
 *               - location
 *               - price
 *     responses:
 *       201:
 *         description: Compound successfully created
 *       400:
 *         description: Bad request, validation failed
 *       403:
 *         description: Unauthorized access
 */
compoundRoutes.post('/create', auth_token(ROLES.admin), createCompound)

/**
 * @swagger
 * /compounds/search:
 *   get:
 *     summary: Searches for compounds based on query parameters
 *     description: This endpoint allows clients to search for compounds based on different criteria.
 *     tags:
 *       - Compounds
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by compound location
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price filter
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: List of compounds
 *       400:
 *         description: Bad request, invalid query parameters
 */
compoundRoutes.get('/search', searchCompounds)

/**
 * @swagger
 * /compounds/get-by-id/{id}:
 *   get:
 *     summary: Retrieves a compound by its ID
 *     description: This endpoint retrieves a specific compound using its unique ID.
 *     tags:
 *       - Compounds
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the compound to retrieve
 *     responses:
 *       200:
 *         description: Compound details successfully retrieved
 *       404:
 *         description: Compound not found
 */
compoundRoutes.get('/get-by-id/:id', getCompoundById)

/**
 * @swagger
 * /compounds/delete/{id}:
 *   delete:
 *     summary: Deletes a compound by its ID
 *     description: This endpoint is used by admins to delete a compound using its ID.
 *     tags:
 *       - Compounds
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the compound to delete
 *     responses:
 *       200:
 *         description: Compound successfully deleted
 *       404:
 *         description: Compound not found
 *       403:
 *         description: Unauthorized access
 */
compoundRoutes.delete('/delete/:id', deleteCompound)
export default compoundRoutes