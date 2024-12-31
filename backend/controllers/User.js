import jwt from 'jsonwebtoken'
import pool from '../lib/db.js'
import bcrypt from 'bcrypt'
import cloudinary from '../api/cloudinary.js'
import { transporter } from '../api/nodemailer.js';

const  generate_token= (user_id) => {
  return jwt.sign(user_id , process.env.ACCESS_TOKEN_SECRET)
}

export const signup = async (req, res, next) => {
    try{
        const {username , email, photo , password} = req.body
        // checking variables
        if (!username || !email ){
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
        
        const query = 'INSERT INTO users (username, email, pfp, password ) VALUES ($1, $2, $3, $4)'
        const values = [ username , email, avatar, hashed_password]
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
        res.status(404)
        throw new Error('cannot find the user!')
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
        return res.status(201).json({message:'success'})
      }else{
        res.status(404)
        throw new Error('cannot find the user!')
      }
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
    const {new_username} = req.body
    
    if (!new_username ){
      return res.status(200).json({message:"nothing has changed."})
    }
    
    await pool.query('UPDATE users SET username = $1 WHERE id = $2', [new_username, user.id])
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


export const reset_password = async (req, res, next )=>{
  
try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    // Check if token is expired
    if (!decoded) {
        return res.status(400).json({
            error: 'Invalid or expired reset token'
        });
    }

    await pool.query('BEGIN');

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [hashedPassword, decoded.userId]
    );

    // Get user email for confirmation
    const userResult = await pool.query(
        'SELECT email FROM users WHERE id = $1',
        [decoded.userId]
    );

    // Send confirmation email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userResult.rows[0].email,
        subject: 'Password Reset Successful',
        html: `
            <h1>Password Reset Successful</h1>
            <p>Your password has been successfully reset.</p>
            <p>If you didn't make this change, please contact our support team immediately.</p>
            <p>Best regards,<br>Your App Team</p>
        `
    };

    await transporter.sendMail(mailOptions);
    await pool.query('COMMIT');

    return res.status(200).json({
        message: 'Password reset successful'
    });

} catch (error) {
    await pool.query('ROLLBACK');
    next(error)
}
}

export const request_reset = async (req, res,next)=> {
try {
    const { email } = req.body;

    const userResult = await pool.query(
        'SELECT id, email FROM users WHERE email = $1',
        [email]
    );

    if (!userResult.rows[0]) {
        res.status(404)
        throw new Error('user not found.')
    }

    const user = userResult.rows[0];

    console.log(user);
    
    // Generate reset token
    const resetToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_RESET_SECRET,
        { expiresIn: '12h' }
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${resetUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Reset Password
            </a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>GATHERLY Team</p>
        `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
        message: 'Password reset email sent'
    });

} catch (error) {
  res.status(500)
  next(error)
}
}

// Reset password using token
export const resetPassword = async (req, res, next) =>{

try {
    const { token, new_password } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    // Check if token is expired
    if (!decoded) {
        res.status(400)
        throw new Error('Invalid or expired reset token')
    }

    await pool.query('BEGIN');

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [hashedPassword, decoded.userId]
    );

    // Get user email for confirmation
    const userResult = await pool.query(
        'SELECT email FROM users WHERE id = $1',
        [decoded.userId]
    );

    // Send confirmation email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userResult.rows[0].email,
        subject: 'Password Reset Successful',
        html: `
            <h1>Password Reset Successful</h1>
            <p>Your password has been successfully reset.</p>
            <p>If you didn't make this change, please contact our support team immediately.</p>
            <p>Best regards,<br>GATHERLY Team</p>
        `
    };

    await transporter.sendMail(mailOptions);
    await pool.query('COMMIT');

    return res.status(200).json({
        message: 'Password reset successful'
    });

} catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error resetting password:', error);
    
    if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({
            error: 'Invalid reset token'
        });
    }
    
    if (error.name === 'TokenExpiredError') {
        return res.status(400).json({
            error: 'Reset token has expired'
        });
    }

    return res.status(500).json({
        error: 'Failed to reset password'
    });
}
}

// // Verify reset token (optional - for frontend validation)
// export const verifyResetToken = async (req, res, next) =>{
// try {
//     const { token } = req.params;

//     const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    
//     if (!decoded) {
//         return res.status(400).json({
//             error: 'Invalid reset token'
//         });
//     }

//     return res.status(200).json({
//         message: 'Valid reset token'
//     });

// } catch (error) {
//     console.error('Error verifying reset token:', error);
    
//     if (error.name === 'TokenExpiredError') {
//         return res.status(400).json({
//             error: 'Reset token has expired'
//         });
//     }

//     return res.status(400).json({
//         error: 'Invalid reset token'
//     });
// }
// }