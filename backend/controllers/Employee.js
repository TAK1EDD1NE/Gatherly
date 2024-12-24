import bcrypt from 'bcrypt'
import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'

// Employee Management Controller
// Create a new employee
export const createEmployee = async (req, res,next)=> {
    const { username, email, password, pfp, compound_id } = req.body;

    // Start a transaction since we need to create user and compound_employee

    try {
        let avatar = ''
        if (!!pfp) {
            const {secure_url: url} = await cloudinary.uploader.upload(pfp, {
            folder: "gatherly",
            width: 200,
            height: 200,
            crop: 'fill',
            gravity: 'face'
            })
            avatar = url          
        }
        await pool.query('BEGIN');
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user with Employee role
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password, pfp, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, pfp, role',
            [username, email, hashedPassword, avatar, 'Employee']
        ); 
        
        // Create compound_employee relationship
        await pool.query(
            'INSERT INTO compound_employees (compound_id, employee_id) VALUES ($1, $2)',
            [compound_id, newUser.rows[0].id]
        );
        
        await pool.query('COMMIT');
        
        res.status(201).json({
            status: 'success',
            data: newUser.rows[0]
        });
    } catch (err) {
        await pool.query('ROLLBACK');
        next(err)
    }
}

// Delete an employee
export const deleteEmployee = async (req, res,next) =>{
    try {
        const { id } = req.params;
        
        // Check if employee exists and has Employee role
        const employee = await pool.query(
            'SELECT * FROM users WHERE id = $1 AND role = $2',
            [id, 'Employee']
        );
        
        if (employee.rows.length === 0) {
            res.status(404)
            throw new Error('user not found.')
        }
        
        // Delete user (cascade will handle related records)
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        
        return res.status(200).json({message: 'Employee deleted successfully'});
    } catch (err) {
        next(err)
    }
}

// Assign employee to event
export const assignToEvent = async (req, res,next)=> {
    try {
        const { event_id, employee_id } = req.body;
        
        // Check if employee exists and belongs to the correct compound
        const employeeCheck = await pool.query(
            `SELECT ce.* FROM compound_employees ce
                JOIN events e ON ce.compound_id = e.compound_id
                WHERE ce.employee_id = $1 AND e.id = $2`,
            [employee_id, event_id]
        );
        
        if (employeeCheck.rows.length === 0) {
            res.status(400)
            throw new Error('Employee does not belong to the event compound')
        }
        
        // Create a default task for the event assignment
        const task = await pool.query(
            'INSERT INTO tasks (description, employee_id) VALUES ($1, $2) RETURNING *',
            ['General event duties', employee_id]
        );
        
        // Create event-employee-task relationship
        const assignment = await pool.query(
            'INSERT INTO event_employees_tasks (event_id, employee_id, task_id) VALUES ($1, $2, $3) RETURNING *',
            [event_id, employee_id, task.rows[0].id]
        );
        
        res.status(201).json({
            status: 'success',
            data: assignment.rows[0]
        });
    } catch (err) {
        next(err)
    }
}
