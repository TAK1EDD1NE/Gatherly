import jwt from 'jsonwebtoken'
import pool from '../lib/db.js'
import bcrypt from 'bcrypt'
import cloudinary from '../api/cloudinary.js'


  // Join as Admin (Convert existing user to admin)
  export const join_as_admin = async (req, res, next)=> {
    try {
        const {id: user_id} = req.user
        const { stripe_id } = req.body;
        await pool.query('UPDATE users SET role = $1 WHERE id = $2',['Admin', user_id])
        await pool.query('INSERT INTO admins (id, stripe_id) VALUES ($1, $2)',[user_id, stripe_id]);
        res.status(201).json({ message: 'Successfully joined as admin' });
    } catch (err) {
      next(err)
    }
  }

class AdminController {




  // Create Employee
  async createEmployee(req, res) {
    try {
      const { 
        firstName, 
        lastName, 
        email, 
        password, 
      } = req.body;

      // Check if email already exists
      const emailCheck = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new employee
      const result = await client.query(
        `INSERT INTO users 
        (first_name, last_name, email, password, role, pfp) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [
          firstName, 
          lastName, 
          email, 
          hashedPassword, 
          'Employee', 
          pfp || null
        ]
      );

      res.status(201).json({ 
        message: 'Employee created successfully', 
        employeeId: result.rows[0].id 
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  // Create Compound with Gallery and Stock
  async createCompound(req, res) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      const { 
        name, 
        location, 
        capacity, 
        adminId, 
        images,
        stockItems 
      } = req.body;

      // Create Compound
      const compoundResult = await client.query(
        'INSERT INTO compounds (name, location, capacity, admin_id) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, location, capacity, adminId]
      );
      const compoundId = compoundResult.rows[0].id;

      // Add Gallery Images
      if (images && images.length > 0) {
        const galleryQueries = images.map((imageUrl) => 
          client.query(
            'INSERT INTO galleries (image_url, compound_id) VALUES ($1, $2)',
            [imageUrl, compoundId]
          )
        );
        await Promise.all(galleryQueries);
      }

      // Create Stock
      const stockResult = await client.query(
        'INSERT INTO stocks (compound_id) VALUES ($1) RETURNING id',
        [compoundId]
      );
      const stockId = stockResult.rows[0].id;

      // Add Stock Items
      if (stockItems && stockItems.length > 0) {
        const stockItemQueries = stockItems.map((item) => 
          client.query(
            `INSERT INTO stock_items 
            (stock_id, name, description, quantity, unit_price) 
            VALUES ($1, $2, $3, $4, $5)`,
            [
              stockId, 
              item.name, 
              item.description || null, 
              item.quantity || 0, 
              item.unitPrice || 0
            ]
          )
        );
        await Promise.all(stockItemQueries);
      }

      await client.query('COMMIT');

      res.status(201).json({ 
        message: 'Compound created successfully', 
        compoundId 
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating compound:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  // CRUD for Compounds
  async getAllCompounds(req, res) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `SELECT c.*, u.first_name as admin_first_name, u.last_name as admin_last_name 
         FROM compounds c
         JOIN users u ON c.admin_id = u.id`
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching compounds:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  async updateCompound(req, res) {
    const client = await this.pool.connect();
    try {
      const { id } = req.params;
      const { name, location, capacity } = req.body;

      const result = await client.query(
        `UPDATE compounds 
         SET name = $1, location = $2, capacity = $3 
         WHERE id = $4 RETURNING *`,
        [name, location, capacity, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Compound not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating compound:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  async deleteCompound(req, res) {
    const client = await this.pool.connect();
    try {
      const { id } = req.params;

      const result = await client.query(
        'DELETE FROM compounds WHERE id = $1 RETURNING *',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Compound not found' });
      }

      res.json({ message: 'Compound deleted successfully' });
    } catch (error) {
      console.error('Error deleting compound:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  // CRUD for Stock Items
  async updateStockItem(req, res) {
    const client = await this.pool.connect();
    try {
      const { id } = req.params;
      const { name, description, quantity, unitPrice } = req.body;

      const result = await client.query(
        `UPDATE stock_items 
         SET name = $1, 
             description = $2, 
             quantity = $3, 
             unit_price = $4 
         WHERE id = $5 RETURNING *`,
        [name, description, quantity, unitPrice, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Stock item not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating stock item:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  // Add more CRUD methods as needed
}

export default AdminController;