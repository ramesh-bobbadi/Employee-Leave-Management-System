import jwt from 'jsonwebtoken'
import pool from '../db.js';

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({message: 'No token provided'})
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err) {
        return res.status(401).json({message: 'Invalid or expired tokens'})
    }
}

const Checkisactive = async (req, res, next) => {
    const id = req.user.id
    try {
        const result = await pool.query("select is_active from users where id = $1",[id])
        if(result.rows.length === 0){
            return res.status(400).json({message:"User not found"})
        }
        if(!result.rows[0].is_active){
            return res.status(403).json({message:"Acount is deactivated"})
        }
        next()
    }
    catch(err) {
       return res.status(401).json({message: 'Inavalid or expired token'})
    }

}

export default Checkisactive;