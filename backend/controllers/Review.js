import pool from "../lib/db";

// Create a new review with ratings
export const createReview= async (req, res, next)=> {

try {
    await pool.query('BEGIN');
    
    const { compound_id, comment, ratings } = req.body;
    const user_id = req.user.id;

    // Verify user has a completed event/reservation for this compound
    const hasCompletedEvent = await pool.query(
    `SELECT 1 FROM events e
        JOIN reservations r ON r.event_id = e.id
        WHERE e.compound_id = $1 
        AND r.user_id = $2 
        AND e.status = 'completed'
        LIMIT 1`,
    [compound_id, user_id]
    );

    if (!hasCompletedEvent.rows[0]) {
    await pool.query('ROLLBACK');
    return res.status(403).json({
        error: 'You can only review compounds where you had a completed event'
    });
    }

    // Check if user already reviewed this compound
    const existingReview = await pool.query(
    'SELECT 1 FROM reviews WHERE user_id = $1 AND compound_id = $2',
    [user_id, compound_id]
    );

    if (existingReview.rows[0]) {
    await pool.query('ROLLBACK');
    return res.status(400).json({
        error: 'You have already reviewed this compound'
    });
    }

    // Create review
    const review = await pool.query(
    `INSERT INTO reviews (user_id, compound_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [user_id, compound_id, comment]
    );

    // Create ratings
    await pool.query(
    `INSERT INTO ratings 
        (review_id, serving_rating, cleanliness_rating, comfort_rating, logistics_rating)
        VALUES ($1, $2, $3, $4, $5)`,
    [
        review.rows[0].id,
        ratings.serving,
        ratings.cleanliness,
        ratings.comfort,
        ratings.logistics
    ]
    );

    await pool.query('COMMIT');

    return res.status(201).json({
    message: 'Review created successfully',
    review: review.rows[0]
    });

} catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error creating review:', error);
    return res.status(500).json({ error: 'Failed to create review' });
} 
}

// Get reviews for a compound
export const getCompoundReviews= async (req, res, next)=> {
try {
    const { compound_id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get reviews with ratings and user info
    const reviews = await pool.query(
    `SELECT 
        r.id,
        r.comment,
        r.created_at,
        u.name as user_name,
        u.avatar as user_avatar,
        rt.serving_rating,
        rt.cleanliness_rating,
        rt.comfort_rating,
        rt.logistics_rating,
        (rt.serving_rating + rt.cleanliness_rating + rt.comfort_rating + rt.logistics_rating) / 4.0 as average_rating
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        JOIN ratings rt ON rt.review_id = r.id
        WHERE r.compound_id = $1
        ORDER BY r.created_at DESC
        LIMIT $2 OFFSET $3`,
    [compound_id, limit, offset]
    );

    // Get total reviews count
    const totalCount = await pool.query(
    'SELECT COUNT(*) FROM reviews WHERE compound_id = $1',
    [compound_id]
    );

    // Get compound average ratings
    const averageRatings = await pool.query(
    `SELECT 
        AVG(serving_rating) as avg_serving,
        AVG(cleanliness_rating) as avg_cleanliness,
        AVG(comfort_rating) as avg_comfort,
        AVG(logistics_rating) as avg_logistics,
        AVG((serving_rating + cleanliness_rating + comfort_rating + logistics_rating) / 4.0) as overall_average
        FROM reviews r
        JOIN ratings rt ON rt.review_id = r.id
        WHERE r.compound_id = $1`,
    [compound_id]
    );

    return res.status(200).json({
    reviews: reviews.rows,
    total: parseInt(totalCount.rows[0].count),
    averageRatings: averageRatings.rows[0],
    currentPage: parseInt(page),
    totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
    });

} catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ error: 'Failed to fetch reviews' });
}
}

// Update a review
export const updateReview= async (req, res, next)=> {

try {
    await pool.query('BEGIN');

    const { review_id } = req.params;
    const { comment, ratings } = req.body;
    const user_id = req.user.id;

    // Verify review ownership
    const review = await pool.query(
    'SELECT * FROM reviews WHERE id = $1 AND user_id = $2',
    [review_id, user_id]
    );

    if (!review.rows[0]) {
    await pool.query('ROLLBACK');
    return res.status(404).json({
        error: 'Review not found or unauthorized'
    });
    }

    // Update review
    await pool.query(
    'UPDATE reviews SET comment = $1 WHERE id = $2',
    [comment, review_id]
    );

    // Update ratings
    await pool.query(
    `UPDATE ratings 
        SET serving_rating = $1,
            cleanliness_rating = $2,
            comfort_rating = $3,
            logistics_rating = $4
        WHERE review_id = $5`,
    [
        ratings.serving,
        ratings.cleanliness,
        ratings.comfort,
        ratings.logistics,
        review_id
    ]
    );

    await pool.query('COMMIT');

    return res.status(200).json({
    message: 'Review updated successfully'
    });

} catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error updating review:', error);
    return res.status(500).json({ error: 'Failed to update review' });
}
}

// Delete a review
export const deleteReview= async (req, res, next)=> {


try {
    await pool.query('BEGIN');

    const { review_id } = req.params;
    const user_id = req.user.id;

    // Verify review ownership or admin status
    const review = await pool.query(
    'SELECT * FROM reviews WHERE id = $1 AND (user_id = $2 OR $3 = true)',
    [review_id, user_id, req.user.isAdmin]
    );

    if (!review.rows[0]) {
    await pool.query('ROLLBACK');
    return res.status(404).json({
        error: 'Review not found or unauthorized'
    });
    }

    // Delete review (ratings will be deleted automatically due to CASCADE)
    await pool.query(
    'DELETE FROM reviews WHERE id = $1',
    [review_id]
    );

    await pool.query('COMMIT');

    return res.status(200).json({
    message: 'Review deleted successfully'
    });

} catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error deleting review:', error);
    return res.status(500).json({ error: 'Failed to delete review' });
} 
}