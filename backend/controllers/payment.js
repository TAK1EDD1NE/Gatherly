import pool from '../lib/db.js'

export const create_payment = async (req ,res , next)=>{
    try{
        const {payments, event_id} = req.body
        payments.forEach(async payment => {
            await pool.query(
                'INSERT INTO payment (description, event_id, price) VALUES ($1, $2, $3)',
                [description, event_id, price]
            );
        });
    }catch(err){
        next(err)
    }
}
