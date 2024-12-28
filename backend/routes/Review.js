import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import { createReview, deleteReview, getCompoundReviews, updateReview } from '../controllers/Review.js';
const reviewRoutes = express.Router()

reviewRoutes.post('/create', auth_token(ROLES.all), createReview)
reviewRoutes.get('/get/:compound_id', auth_token(ROLES.all), getCompoundReviews)
reviewRoutes.patch('/update/:review_id', auth_token(ROLES.all), updateReview)
reviewRoutes.delete('/delete/:review_id', auth_token(ROLES.all), deleteReview)
export default reviewRoutes