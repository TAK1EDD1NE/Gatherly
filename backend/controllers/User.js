import jwt from 'jsonwebtoken'
import pool from '../lib/db.js'
import bcrypt from 'bcrypt'
import cloudinary from '../api/cloudinary.js'

const  generate_token= (user_id) => {
  return jwt.sign(user_id , process.env.ACCESS_TOKEN_SECRET)
}

export const signup = async (req, res, next) => {
    try{
        const {first_name , last_name , email, photo , password} = req.body
        // checking variables
        if (!first_name || !last_name || !email ){
          res.status(400)
          throw new Error('please fill in all required fields')
        } 
        if (password.length <8 ){
          res.status(400)
          throw new Error('password should contain more than 8 characters')
        }
        let avatar = ''
        if (!!photo) {
          const {secure_url: url} = await cloudinary.uploader.upload(photo, {
            folder: "gatherly",
            width: 200,
            height: 200,
            crop: 'fill',
            gravity: 'face'
          })
          avatar = url          
        }
        const hashed_password = await bcrypt.hash(password , 10)
        
        const query = 'INSERT INTO users (first_name, last_name, email, pfp, password ) VALUES ($1, $2, $3, $4, $5)'
        const values = [ first_name, last_name , email, avatar, hashed_password]
        await pool.query(query, values)
        res.status(201).json({message :"user created successfully."})
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
        return res.status(404).send('cannot find the user!')
      }    
      const pwd_correct = await bcrypt.compare(password, user.password) 
      
      const token = generate_token(user.id)
      res.cookie('tigerToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 864e5),
        // secure: true,
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

export const get_user_by_id = async(req, res ,next) =>{
  try{
    const {user_id} = req.params
    
    const query = 'SELECT * FROM users WHERE id = $1'
    const user = (await pool.query(query , [user_id])).rows[0]
    
    if(!user){
      res.status(404)
      throw Error('user not found.')
    }
    
    return res.json(user)
  }catch(err){
    next(err)
  }
}

export const update_name = async(req, res, next) =>{
  try{
    const user = req.user
    const {new_first_name, new_last_name} = req.body
    
    if (!new_first_name && !new_last_name ){
      return res.status(200).json({message:"nothing has changed."})
    }
    const first_name = new_first_name || user.first_name
    const last_name = new_last_name || user.last_name
    await pool.query('UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3', [first_name, last_name , user.id])
    return res.status(201).json({message:"name has been updated"})
  }catch(err){
    next(err)
  }
}
export const update_photo = async (req, res, next) =>{
  try{
    const user = req.user
    const {photo} = req.body
    
    if (!photo){
      return res.status(200).json({message:"nothing has changed."})
    }
    const {secure_url: pfp} = await cloudinary.uploader.upload(photo, {
      folder: "gatherly",
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'face'
    })
    await pool.query('UPDATE users SET pfp = $1 WHERE id = $2', [pfp, user.id])
    return res.status(201).json({message:"photo has been updated"})
  }catch(err){
    next(err)
  }
}
export const update_password = async (req, res, next)=>{
  try{
    const user = req.user
    const {new_password} = req.body
    
    if (new_password.length < 8){
      res.status(400)
      throw new Error('password should contain more than 8 characters')
    }
    const hashed_password = await bcrypt.hash(new_password , 10)
    
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed_password, user.id])
    return res.status(201).json({message:"pwd has been updated"})
  }catch(err){
    next(err)
  }
}


export const signout = async (req, res, next) => {

  try {
    res.cookie('tigerToken', '', {
      expires: new Date(0),
      sameSite: 'none',
      secure: true
    })
    res.status(200).json({message: 'successfuly logged out'})
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next)=>{
  try{
    
    const {id: user_id} = req.user
    
    const rows_affected = (await pool.query('DELETE FROM users WHERE id = $1', [user_id])).rowCount
    if (rows_affected == 0){
      res.status(500)
      throw new Error("server error.")
    }
    return res.status(200).json({message: 'successfuly logged out'})
  }catch(err){
    next(err)
  }
}
