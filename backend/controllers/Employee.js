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

// Assign task to employee in event
export const assignTask = async (req, res,next) =>{
    try {
        const { event_id, employee_id, description } = req.body;
        
        // Start a transaction
        
        try {
            await pool.query('BEGIN');
            
            // Create new task
            const newTask = await pool.query(
                'INSERT INTO tasks (description, employee_id) VALUES ($1, $2) RETURNING *',
                [description, employee_id]
            );
            
            // Create event-employee-task relationship
            await pool.query(
                'INSERT INTO event_employees_tasks (event_id, employee_id, task_id) VALUES ($1, $2, $3)',
                [event_id, employee_id, newTask.rows[0].id]
            );
            
            await pool.query('COMMIT');
            
            res.status(201).json({data: newTask.rows[0]})
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}
// Get employee tasks for an event
export const getEmployeeEventTasks = async (req, res,next)=> {
    try {
        const { event_id, employee_id } = req.params;
        console.log({ event_id, employee_id });
        
        // First verify the employee exists
        const employeeExists = await pool.query(
            'SELECT * FROM users WHERE id = $1 AND role = $2',
            [employee_id, 'Employee']
        );

        if (employeeExists.rows.length === 0) {
            res.status(404)
            throw new Error('employee not found.')
        }

        // Verify the event exists
        const eventExists = await pool.query(
            'SELECT * FROM events WHERE id = $1',
            [event_id]
        );

        if (eventExists.rows.length === 0) {
            res.status(404)
            throw new Error('event not found.')
        }

        // Check if employee is assigned to the event
        const assignmentExists = await pool.query(
            'SELECT * FROM event_employees_tasks WHERE event_id = $1 AND employee_id = $2',
            [event_id, employee_id]
        );

        if (assignmentExists.rows.length === 0) {
            res.status(404)
            throw new Error('Employee is not assigned to this event')
        }

        // Get tasks with LEFT JOIN to ensure we get tasks even if some relationships are missing
        const tasks = await pool.query(
            `SELECT 
                t.id AS task_id,
                t.description AS task_description,
                eet.event_id,
                e.name AS event_name,
                e.start_date AS event_start_date,
                e.end_date AS event_end_date,
                u.id AS employee_id,
                u.username AS employee_name,
                u.email AS employee_email
            FROM tasks t
            LEFT JOIN event_employees_tasks eet ON t.id = eet.task_id
            LEFT JOIN events e ON eet.event_id = e.id
            LEFT JOIN users u ON t.employee_id = u.id
            WHERE t.employee_id = $1 
            AND eet.event_id = $2`,
            [employee_id, event_id]
        );
        
        res.status(200).json({data: tasks.rows});
    } catch (err) {
        next(err)
    }
}

// Remove task from event
export const removeTask = async (req, res,next)=> {
    try {
        const { task_id } = req.params;
        
        const result = await pool.query(
            'DELETE FROM event_employees_tasks WHERE task_id = $1 RETURNING *',
            [task_id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Task assignment not found'
            });
        }
        
        // Also delete the task itself
        await pool.query('DELETE FROM tasks WHERE id = $1', [task_id]);
        
        res.status(200).json({message: 'Task removed successfully'});
    } catch (err) {
        next(err)
    }
}
