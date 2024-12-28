import stripe  from '../api/stripe.js';
import pool from '../lib/db.js'

// Step 1: User initiates reservation request
// export const createReservationRequest=  async (req, res,next)=> {
// try {
//     const { eventId } = req.body;
//     const userId = req.user.id;

//     // Check if event exists and is available
//     const event = await pool.query(
//     'SELECT * FROM events WHERE id = $1 AND start_date > NOW()',
//     [eventId]
//     );
    
//     if (!event.rows[0]) {
//         return res.status(404).json({ error: 'Event not found or not available' });
//     }

//     // Check if event is already reserved
//     const existingReservation = await pool.query(
//     'SELECT * FROM reservations WHERE event_id = $1 AND status != $2',
//     [eventId, 'rejected']
//     );

//     if (existingReservation.rows[0]) {
//         return res.status(400).json({ error: 'Event is already reserved' });
//     }

//     // Create initial reservation
//     const reservation = await pool.query(
//     `INSERT INTO reservations 
//         (user_id, event_id, status, payment_intent_id) 
//         VALUES ($1, $2, 'pending', '') 
//         RETURNING *`,
//     [userId, eventId]
//     );

//     return res.status(201).json({
//     message: 'Reservation request created',
//     reservation: reservation.rows[0],
//     event: event.rows[0]
//     });
// } catch (error) {
//     console.error('Error creating reservation request:', error);
//     return res.status(500).json({ error: 'Internal server error' });
// }
// }

// // Step 2: Hall owner responds to request
// export const respondToReservation=  async (req, res,next)=>{
// try {
//     const { reservationId } = req.params;
//     const { status, amount } = req.body;
//     const ownerId = req.user.id;

//     // Verify owner owns this event's compound
//     const isOwner = await pool.query(
//     `SELECT compounds.owner_id FROM reservations 
//         JOIN events ON events.id = reservations.event_id 
//         JOIN compounds ON compounds.id = events.compound_id 
//         WHERE reservations.id = $1 AND compounds.owner_id = $2`,
//     [reservationId, ownerId]
//     );

//     if (!isOwner.rows[0]) {
//     return res.status(403).json({ error: 'Unauthorized' });
//     }

//     if (status === 'rejected') {
//     await pool.query(
//         'UPDATE reservations SET status = $1 WHERE id = $2',
//         ['rejected', reservationId]
//     );
//     return res.status(200).json({ message: 'Reservation rejected' });
//     }

//     // Create Stripe PaymentIntent
//     const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount * 100, // Convert to cents
//     currency: 'usd',
//     metadata: { reservationId }
//     });

//     // Update reservation with payment details
//     await pool.query(
//     `UPDATE reservations 
//         SET status = 'awaiting_payment', 
//         payment_intent_id = $2
//         WHERE id = $1`,
//     [reservationId, paymentIntent.id]
//     );

//     return res.status(200).json({
//     message: 'Reservation approved',
//     clientSecret: paymentIntent.client_secret
//     });
// } catch (error) {
//     console.error('Error responding to reservation:', error);
//     return res.status(500).json({ error: 'Internal server error' });
// }
// }

// // Step 3: Handle payment completion
// export const handlePaymentCompletion=  async (req, res,next)=>{

// try {
//     const { paymentIntentId } = req.body;

//     // Verify payment status with Stripe
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
//     if (paymentIntent.status !== 'succeeded') {
//     return res.status(400).json({ error: 'Payment not successful' });
//     }

//     // Update reservation status
//     await pool.query(
//     'UPDATE reservations SET status = $1 WHERE payment_intent_id = $2',
//     ['confirmed', paymentIntentId]
//     );

//     return res.status(200).json({ message: 'Reservation confirmed' });
// } catch (error) {
//     console.error('Error completing payment:', error);
//     return res.status(500).json({ error: 'Internal server error' });
// }
// }

// // Get reservation with event details
// export const getReservationDetails=  async (req, res,next)=>{
// try {
//     const { reservationId } = req.params;
//     const userId = req.user.id;

//     const reservation = await pool.query(
//     `SELECT 
//         r.*,
//         e.name,
//         e.description,
//         e.start_date,
//         e.end_date
//         FROM reservations r
//         JOIN events e ON e.id = r.event_id 
//         WHERE r.id = $1 
//         AND (r.user_id = $2 OR EXISTS (
//         SELECT 1 FROM compounds c
//         JOIN events ev ON ev.compound_id = c.id 
//         WHERE c.owner_id = $2 
//         AND ev.id = r.event_id
//         ))`,
//     [reservationId, userId]
//     );

//     if (!reservation.rows[0]) {
//     return res.status(404).json({ error: 'Reservation not found' });
//     }

//     return res.status(200).json(reservation.rows[0]);
// } catch (error) {
//     console.error('Error getting reservation details:', error);
//     return res.status(500).json({ error: 'Internal server error' });
// }
// }




export const createReservation = async (req, res) => {
    
    try {
        await pool.query('BEGIN'); // Start transaction

        const { eventId } = req.body;
        const userId = req.user.id;

        // Get event details and verify client ownership
        const eventResult = await pool.query(
            'SELECT * FROM events WHERE id = $1 AND client_id = $2 AND status = $3',
            [eventId, userId, 'accepted-owner']
        );

        if (!eventResult.rows[0]) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ 
                error: 'Event not found or not accepted' 
            });
        }

        // Calculate total amount from payments
        const paymentsResult = await pool.query(
            'SELECT SUM(price) as total FROM payments WHERE event_id = $1',
            [eventId]
        );

        const totalAmount = paymentsResult.rows[0].total;

        if (!totalAmount) {
            await pool.query('ROLLBACK');
            return res.status(400).json({ 
                error: 'No payments found for this event' 
            });
        }

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Convert to cents for Stripe
            currency: 'usd',
            metadata: { eventId },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Create reservation
        const reservationResult = await pool.query(
            `INSERT INTO reservations (user_id, event_id, payment_intent_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [userId, eventId, paymentIntent.id]
        );

        // Update event status to processing payment
        await pool.query(
            `UPDATE events 
             SET status = 'processing-payment' 
             WHERE id = $1`,
            [eventId]
        );

        await pool.query('COMMIT');

        return res.status(201).json({
            message: 'Reservation initiated',
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: totalAmount,
            reservation: reservationResult.rows[0]
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating reservation:', error);
        return res.status(500).json({ 
            error: 'Failed to create reservation' 
        });
    }
};

// Webhook handler for successful payment
export const handlePaymentSuccess = async (req, res) => {
    
    try {
        await pool.query('BEGIN');

        const { payment_intent } = req.body.data.object;

        // Update event status
        await pool.query(
            `UPDATE events e
             SET status = 'paid'
             FROM reservations r
             WHERE r.payment_intent_id = $1
             AND r.event_id = e.id`,
            [payment_intent.id]
        );

        await pool.query('COMMIT');
        
        return res.status(200).json({ received: true });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error handling payment success:', error);
        return res.status(500).json({ 
            error: 'Failed to process payment success' 
        });
    }
};