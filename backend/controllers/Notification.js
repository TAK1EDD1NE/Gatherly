import pool from '../lib/db.js'

// done
export const sendNotification = async (from, to, note) => {
  await pool.query(
    'INSERT INTO notifications (sender_id, receiver_id, seen, note) VALUES ($1, $2, $3, $4)',
    [from, to, false, note]
  )
}


// done
export const getNotifications = async (req, res, next) => {
  const {_id: user_id} = req.user
  try {
    const notifications = (await pool.query(
        'SELECT * FROM notifications WHERE receiver_id = $1 ORDER BY created_at DESC',
        [user_id])).rows
    let result = []
    notifications.forEach(async notification => {
        const user = (await pool.query(
            'SELECT username, pfp FROM users WHERE id = $1 ORDER BY created_at DESC',
            [notification.sender_id])).rows[0]
        result+={notification , user} 
    });
    
    res.status(200).json(result)

  } catch (error) {
    next(error)
  }
}

// done
export const seenNotification = async (req, res, next) => {
  const {note, from, to} = req.body
  try {
    await pool.query('UPDATE notifications SET seen = TRUE WHERE sender_id = $1 AND receiver_id = $2',[from, to])
    res.status(200).json({message: 'seen'})
  } catch (error) {
    next(error)
  }
}