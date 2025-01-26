import pool from '../lib/db.js'

  // Join as Admin (Convert existing user to admin)
export const join_as_admin = async (req, res, next)=> {
  try {
      const {id: user_id} = req.user
      const { stripe_id } = req.body
      const {rowCount : inserted} = await pool.query('INSERT INTO admins (id, stripe_id) VALUES ($1, $2)',[user_id, stripe_id]);
      if(!inserted){
        res.status(500)
        throw new Error("internal sever error!")
      }
      const {rowCount : role_updated} = await pool.query('UPDATE users SET role = $1 WHERE id = $2',['Admin', user_id])
      if(!role_updated){
        res.status(500)
        throw new Error("internal sever error!")
      }
      console.log('ya fesngksdgd');
      
      return res.status(201).json({ message: 'Successfully joined as admin' });
  } catch (err) {
    next(err)
  }
}


export const get_admin = async (req, res ,next)=>{
  try{
    const {id:admin_id} = req.user

    const query = `
        SELECT 
            u.id, 
            u.username, 
            u.email, 
            u.pfp, 
            u.role, 
            a.stripe_id
        FROM users u
        JOIN admins a ON u.id = a.id
        WHERE u.id = $1;
    `;
    const admin_info = (await pool.query(query,[admin_id])).rows[0]
    if(!admin_id){
      res.status(500)
      throw new Error('internal server error.')
    }
    return res.json(admin_info)
  }catch(err){
    next(err)
  }
}