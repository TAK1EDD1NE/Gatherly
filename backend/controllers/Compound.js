import jwt from 'jsonwebtoken'
import pool from '../lib/db.js'
import bcrypt from 'bcrypt'
import cloudinary from '../api/cloudinary.js'


// export const create_compound = async(req , res , next)=>{
//     try{
//         const user = req.user
//         const {} = req.body
//     }catch(err){
//         next(err)
//     }

// }

// export const create_employee = async (req, res, next)=> {
//     try {
//       const { first_name, last_name, email, password } = req.body

//       const email_check = (await client.query('SELECT * FROM users WHERE email = $1',[email])).rows

//       if (email_check.length > 0) {
//         res.status(400)
//         throw new Error('Email already exists')
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const result = await pool.query(
//         `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
//         [first_name, last_name, email, hashedPassword, 'Employee']);

//       res.status(201).json({ message: 'Employee created successfully', employee_id: result.rows[0].id });
//     } catch (error) {
//       next(error)
//     }
//   }







// class AdminController {

//   async createCompound(req, res, next) {
//     try {
//       const { name, location, capacity, adminId, images, stockItems } = req.body;

//       const compoundResult = await pool.query(
//         'INSERT INTO compounds (name, location, capacity, admin_id) VALUES ($1, $2, $3, $4) RETURNING id',
//         [name, location, capacity, adminId]);
//       const compoundId = compoundResult.rows[0].id;

//       // Add Gallery Images
//       if (images && images.length > 0) {
//         const galleryQueries = images.map((imageUrl) => 
//           pool.query(
//             'INSERT INTO galleries (image_url, compound_id) VALUES ($1, $2)',
//             [imageUrl, compoundId]
//           )
//         );
//         await Promise.all(galleryQueries);
//       }

//       // Create Stock
//       const stockResult = await client.query(
//         'INSERT INTO stocks (compound_id) VALUES ($1) RETURNING id',
//         [compoundId]
//       );
//       const stockId = stockResult.rows[0].id;

//       // Add Stock Items
//       if (stockItems && stockItems.length > 0) {
//         const stockItemQueries = stockItems.map((item) => 
//           client.query(
//             `INSERT INTO stock_items 
//             (stock_id, name, description, quantity, unit_price)
//             VALUES ($1, $2, $3, $4, $5)`,
//             [stockId, item.name, item.description || null, item.quantity || 0, item.unitPrice || 0]
//           )
//         );
//         await Promise.all(stockItemQueries);
//       }
//       return res.status(201).json({ message: 'Compound created successfully', compoundId });
//     } catch (err) {
//       next(err)
//     }
//   }

//   // CRUD for Compounds
//   async getAllCompounds(req, res) {
//     const client = await this.pool.connect();
//     try {
//       const result = await client.query(
//         `SELECT c.*, u.first_name as admin_first_name, u.last_name as admin_last_name 
//          FROM compounds c
//          JOIN users u ON c.admin_id = u.id`
//       );
//       res.json(result.rows);
//     } catch (error) {
//       console.error('Error fetching compounds:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       client.release();
//     }
//   }

//   async updateCompound(req, res) {
//     const client = await this.pool.connect();
//     try {
//       const { id } = req.params;
//       const { name, location, capacity } = req.body;

//       const result = await client.query(
//         `UPDATE compounds 
//          SET name = $1, location = $2, capacity = $3 
//          WHERE id = $4 RETURNING *`,
//         [name, location, capacity, id]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ message: 'Compound not found' });
//       }

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error updating compound:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       client.release();
//     }
//   }

//   async deleteCompound(req, res) {
//     const client = await this.pool.connect();
//     try {
//       const { id } = req.params;

//       const result = await client.query(
//         'DELETE FROM compounds WHERE id = $1 RETURNING *',
//         [id]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ message: 'Compound not found' });
//       }

//       res.json({ message: 'Compound deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting compound:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       client.release();
//     }
//   }

//   // CRUD for Stock Items
//   async updateStockItem(req, res) {
//     const client = await this.pool.connect();
//     try {
//       const { id } = req.params;
//       const { name, description, quantity, unitPrice } = req.body;

//       const result = await client.query(
//         `UPDATE stock_items 
//          SET name = $1, 
//              description = $2, 
//              quantity = $3, 
//              unit_price = $4 
//          WHERE id = $5 RETURNING *`,
//         [name, description, quantity, unitPrice, id]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ message: 'Stock item not found' });
//       }

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error updating stock item:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       client.release();
//     }
//   }

//   // Add more CRUD methods as needed
// }

// export default AdminController;