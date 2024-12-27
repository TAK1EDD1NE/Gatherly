import jwt from 'jsonwebtoken'
import pool from '../lib/db.js'

export const auth_token = (roles) =>{
    return async (req, res, next)=>{
        try{          
            const token = req.cookies.tigerToken
            if (!token) {
                res.sendStatus(401)
                throw new Error('session expired, please login.')
            }
            
            const verified = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
            
            if(!verified){
                res.sendStatus(401)
                throw new Error('not authorized.')
            }
            const user_id = verified
            
            const user = (await pool.query('SELECT * FROM users WHERE id = $1', [user_id])).rows[0]
            if(!user){
                res.sendStatus(401)
                throw new Error('user not found')
            }
            if (!roles.includes(user.role)) {
                res.status(403)
                throw new Error('not authorised to access this route')
              }
              
            req.user = user 
            next()
        }catch(err){
            next(err)
        }
        
    }
}


