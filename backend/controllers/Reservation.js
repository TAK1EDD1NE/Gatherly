import stripe  from '../api/stripe.js';
import pool from '../lib/db.js'

// Step 1: User initiates reservation request
export const createReservationRequest=  async (req, res,next)=> {
try {
    const { eventId } = req.body;
    const userId = req.user.id;

    // Check if event exists and is available
    const event = await pool.query(
    'SELECT * FROM events WHERE id = $1 AND start_date > NOW()',
    [eventId]
    );
    
    if (!event.rows[0]) {
        return res.status(404).json({ error: 'Event not found or not available' });
    }

    // Check if event is already reserved
    const existingReservation = await pool.query(
    'SELECT * FROM reservations WHERE event_id = $1 AND status != $2',
    [eventId, 'rejected']
    );

    if (existingReservation.rows[0]) {
        return res.status(400).json({ error: 'Event is already reserved' });
    }

    // Create initial reservation
    const reservation = await pool.query(
    `INSERT INTO reservations 
        (user_id, event_id, status, payment_intent_id) 
        VALUES ($1, $2, 'pending', '') 
        RETURNING *`,
    [userId, eventId]
    );

    return res.status(201).json({
    message: 'Reservation request created',
    reservation: reservation.rows[0],
    event: event.rows[0]
    });
} catch (error) {
    console.error('Error creating reservation request:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
}

// Step 2: Hall owner responds to request
export const respondToReservation=  async (req, res,next)=>{
try {
    const { reservationId } = req.params;
    const { status, amount } = req.body;
    const ownerId = req.user.id;

    // Verify owner owns this event's compound
    const isOwner = await pool.query(
    `SELECT compounds.owner_id FROM reservations 
        JOIN events ON events.id = reservations.event_id 
        JOIN compounds ON compounds.id = events.compound_id 
        WHERE reservations.id = $1 AND compounds.owner_id = $2`,
    [reservationId, ownerId]
    );

    if (!isOwner.rows[0]) {
    return res.status(403).json({ error: 'Unauthorized' });
    }

    if (status === 'rejected') {
    await pool.query(
        'UPDATE reservations SET status = $1 WHERE id = $2',
        ['rejected', reservationId]
    );
    return res.status(200).json({ message: 'Reservation rejected' });
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    metadata: { reservationId }
    });

    // Update reservation with payment details
    await pool.query(
    `UPDATE reservations 
        SET status = 'awaiting_payment', 
        payment_intent_id = $2
        WHERE id = $1`,
    [reservationId, paymentIntent.id]
    );

    return res.status(200).json({
    message: 'Reservation approved',
    clientSecret: paymentIntent.client_secret
    });
} catch (error) {
    console.error('Error responding to reservation:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
}

// Step 3: Handle payment completion
export const handlePaymentCompletion=  async (req, res,next)=>{

try {
    const { paymentIntentId } = req.body;

    // Verify payment status with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
    return res.status(400).json({ error: 'Payment not successful' });
    }

    // Update reservation status
    await pool.query(
    'UPDATE reservations SET status = $1 WHERE payment_intent_id = $2',
    ['confirmed', paymentIntentId]
    );

    return res.status(200).json({ message: 'Reservation confirmed' });
} catch (error) {
    console.error('Error completing payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
}

// Get reservation with event details
export const getReservationDetails=  async (req, res,next)=>{
try {
    const { reservationId } = req.params;
    const userId = req.user.id;

    const reservation = await pool.query(
    `SELECT 
        r.*,
        e.name,
        e.description,
        e.start_date,
        e.end_date
        FROM reservations r
        JOIN events e ON e.id = r.event_id 
        WHERE r.id = $1 
        AND (r.user_id = $2 OR EXISTS (
        SELECT 1 FROM compounds c
        JOIN events ev ON ev.compound_id = c.id 
        WHERE c.owner_id = $2 
        AND ev.id = r.event_id
        ))`,
    [reservationId, userId]
    );

    if (!reservation.rows[0]) {
    return res.status(404).json({ error: 'Reservation not found' });
    }

    return res.status(200).json(reservation.rows[0]);
} catch (error) {
    console.error('Error getting reservation details:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
}