import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'

// Create a compound
export const createCompound = async (req, res , next) => {
  try {
    const { name , location } = req.body
    const {id: admin_id} = req.user

    if (!name || !location.x || !location.y){
        res.status(400)
        throw new Error('please fill in all required fields')
    }

    const result = await pool.query(
      'INSERT INTO compounds (name, admin_id) VALUES ($1, $2) RETURNING *',
      [name, admin_id]
    )
    const compound_id = result.rows[0].id;
    await pool.query(
      'INSERT INTO locations (id, x, y) VALUES ($1, $2, $3) ',
      [compound_id, location.x, location.y]
    );

    res.status(201).json({message: 'compound created successfully.'})
  } catch (err) {
    next(err)
  }
};
