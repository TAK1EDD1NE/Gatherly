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
