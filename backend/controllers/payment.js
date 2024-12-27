import pool from '../lib/db.js'

export const create_payment = async (req ,res , next)=>{
    try{
        const {payments, event_id} = req.body
        payments.forEach(async payment => {
            await pool.query(
                'INSERT INTO payment (description, event_id, price) VALUES ($1, $2, $3)',
                [payment.description, event_id, payment.price]
            );
        });
        await pool.query(`UPDATE events SET status = 'accepted-owner' WHERE id = $1`,[event_id])
        return res.status(200).json({message:'bill created seccessefully'})
    }catch(err){
        next(err)
    }
}

export const getPayments = async (req, res, next) => {
    try {
      const { event_id } = req.params;
      const payments = await pool.query(
        'SELECT * FROM payment WHERE event_id = $1',
        [event_id]
      );
      res.json({data: payments.rows});
    } catch (err) {
      next(err);
    }
  };