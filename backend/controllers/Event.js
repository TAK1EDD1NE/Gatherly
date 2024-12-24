import pool from '../lib/db.js'
export const createEvent = async (req, res, next)=> {
    try {
        const { name, description, start_date, end_date, compound_id } = req.body;        
        const compound = await (pool.query('SELECT * FROM compounds WHERE id = $1', [compound_id]))
        if (compound.rows.length === 0 ){
            res.status(404)
            throw new Error('compound not found.')
        }
        
        const newEvent = await pool.query(
            'INSERT INTO events (name, description, start_date, end_date, compound_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, start_date, end_date, compound_id]
        );

        return res.status(201).json({data: newEvent.rows[0]});
    } catch (err) {
        next(err)
    }
}


// Get all events
export const get_all_events =async (req, res, next)=> {
    try {
        const {compound_id} = req.body
        const events = await pool.query('SELECT * FROM events WHERE compound_id = $1', [compound_id]);
        res.json({
            status: 'success',
            data: events.rows
        });
    } catch (err) {
        next(err)
    }
}

// Get event by ID with guest list and program
export const getEventById = async (req, res,next)=> {
    try {
        const { id } = req.params;
        
        // Get event details
        const event = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        
        if (event.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        // Get guest list
        const guestList = await pool.query(
            'SELECT * FROM guest_lists WHERE event_id = $1',
            [id]
        );

        // Get event program
        const program = await pool.query(
            'SELECT * FROM event_program WHERE event_id = $1',
            [id]
        );

        res.json({
            status: 'success',
            data: {
                event: event.rows[0],
                guestList: guestList.rows,
                program: program.rows
            }
        });
    } catch (err) {
        next(err)
    }
}

// // Update event
// export const updateEvent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, start_date, end_date, compound_id } = req.body;
        
//         const updatedEvent = await pool.query(
//             'UPDATE events SET name = $1, description = $2, start_date = $3, end_date = $4, compound_id = $5 WHERE id = $6 RETURNING *',
//             [name, description, start_date, end_date, compound_id, id]
//         );
        
//         if (updatedEvent.rows.length === 0) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Event not found'
//             });
//         }

//         res.json({
//             status: 'success',
//             data: updatedEvent.rows[0]
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'error',
//             message: err.message
//         });
//     }
// },

// Delete event
export const deleteEvent = async (req, res,next )=> {
    try {
        const { id } = req.params;
        
        const deletedEvent = await pool.query(
            'DELETE FROM events WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (deletedEvent.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Event deleted successfully'
        });
    } catch (err) {
        next(err)
    }
}

// Add guest to event
export const addGuest = async (req, res,next)=> {
    try {
        const { guest_first_name, guest_last_name, event_id } = req.body;
        
        const newGuest = (await pool.query(
            'INSERT INTO guest_lists (guest_first_name, guest_last_name, event_id) VALUES ($1, $2, $3) RETURNING *',
            [guest_first_name, guest_last_name, event_id]
        )).rows[0]
        
        return res.status(201).json({message: 'success',newGuest});
    } catch (err) {
        next(err)
    }
}

// Remove guest from event
export const removeGuest = async (req, res,next)=> {
    try {
        const { id } = req.params;
        
        const deletedGuest = await pool.query(
            'DELETE FROM guest_lists WHERE id = $1',
            [id]
        );
        
        if (!deletedGuest.rowCount) {
            res.status(404)
            throw new Error('internal server error.')
        }

        return res.status(200).json({message: 'Guest removed successfully'})
    } catch (err) {
        next(err)
    }
}


// Add program item
export const addProgramItem = async (req, res,next) =>{
    try {
        const { description, start_time, end_time, event_id } = req.body;
        if(!description || ! start_time || !end_time){
            res.status(403)
            throw new Error('fill all required fields.')
        }
        const newProgramItem = await pool.query(
            'INSERT INTO event_program (description, start_time, end_time, event_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [description, start_time, end_time, event_id]
        );
        
        res.status(201).json({status: 'success', id : newProgramItem.rows[0].id})
    } catch (err) {
        next(err)
    }
}

// Update program item
// export const updateProgramItem = async (req, res,next) => {
//     try {
//         const { id } = req.params;
//         const { description, start_time, end_time } = req.body;
        
//         const updatedItem = await pool.query(
//             'UPDATE event_program SET description = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *',
//             [description, start_time, end_time, id]
//         );
        
//         if (updatedItem.rows.length === 0) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Program item not found'
//             });
//         }

//         res.json({
//             status: 'success',
//             data: updatedItem.rows[0]
//         });
//     } catch (err) {
//         next(err)
//     }
// }

// Delete program item
export const deleteProgramItem =async (req, res,next) => {
    try {
        const { id } = req.params;
        
        const deletedItem = await pool.query(
            'DELETE FROM event_program WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (deletedItem.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Program item not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Program item deleted successfully'
        });
    } catch (err) {
        next(err)
    }
}
