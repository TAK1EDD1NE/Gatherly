import jwt from 'jsonwebtoken'
import pool from '../lib/db.js'

const secure = () => {

    return async (req, res, next) => {
      try {
        const token = req.cookies.tigerToken
        // console.log('token', token)
        if (!token) {
          req.user = {}
          next()
          return
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
  
        if (!verified) {
          req.user = {}
          next()
          return
        }
        const {user_id} = verified
        const user = (await pool.query('SELECT * FROM users WHERE id = $1', [user_id])).rows[0]
        
        if (!user) {
          req.user = {}
          next()
          return
        } 
        req.user = user
        next()
        return
      } catch (err) {
        next(err)
      }
    }
  
  }
  
  export default secure