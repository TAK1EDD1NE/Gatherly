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

export const login = async(req, res, next) => {
  try{        
      const {email, password} = req.body
          
      const query = 'SELECT * FROM users WHERE email = $1'
      const values = [email]
      const user = (await pool.query(query, values)).rows[0]
      if (!user){
        return res.status(400).send('cannot find the user!')
      }    
      const pwd_correct = await bcrypt.compare(password, user.password) 
      
      const token = generate_token(user.id)
      res.cookie('tigerToken', token, {
        

        httpOnly: true,
        expires: new Date(Date.now() + 864e5),
        secure: true,
        sameSite: 'none',
        path: '/'
      })
      
      if (pwd_correct){
        res.status(200).send('success')
      }else{
        res.status(400).send('try again something is wrong!')
      }
      res.status(201).send()
    }catch(err){
      next(err)
    }
}
