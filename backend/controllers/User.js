import jwt from 'jsonwebtoken'
// import cloudinary from '../api/cloudinary.js'
import pool from '../lib/db.js'
import bcrypt from 'bcrypt'


const  generate_token= (user_id) => {
  return jwt.sign(user_id , process.env.ACCESS_TOKEN_SECRET)
}

export const signup = async (req, res, next) => {
    try{
        const {first_name , last_name , email, pfp , password} = req.body

        if (!first_name || !last_name || !email ){
          res.status(400)
          throw new Error('please fill in all required fields')
        } 
        if (password.length <8 ){
          res.status(400)
          throw new Error('password should contain more than 8 characters')
        }
        const hashed_password = await bcrypt.hash(password , 10)
        
        const query = 'INSERT INTO users (first_name, last_name, email, pfp, password ) VALUES ($1, $2, $3, $4, $5)'
        const values = [ first_name, last_name , email, pfp, hashed_password]
        await pool.query(query, values)
        return res.status(201).send()
      }catch(err){
        next(err)
      }
}
