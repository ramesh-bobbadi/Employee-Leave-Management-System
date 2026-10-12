import jwt from 'jsonwebtoken'
import { verifyToken } from '../middleware/auth.js';
import Checkisactive from '../middleware/auth.js';

import { Router } from 'express';
import pool from '../db.js'

const router = Router()

//post request to create a new user

router.post('/post', verifyToken, Checkisactive, async (req, res) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) {           //check for required fields
        return res.status(400).json({ message: 'All fields are required' })
    }
    if (role !== "employee" && role != "admin") {          //check for valid role              
        return res.status(400).json({ message: "Role must be employee or admin" })
    }
    try {
        const exitingUser = await pool.query("select id from users where email =$1", [email])
        if (exitingUser.rows.length > 0) {
            return res.status(409).json({ message: "This Email Already exits" })
        }
        const result = await pool.query(
            `insert into users (name, email, password, role)
             values($1, $2, $3, $4)
            `, [name, email, password, role]
        );
        res.status(201).json({
            message: "User created successfully",
            user: result.rows[0],
        })
    }
    catch (err) {
        res.status(500).json({ message: "Failed To Create User", })
    }
})

// post request to login user with email and password

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const varified = await pool.query('select email, password from users where email = $1 and password = $2', [email, password])
        const user = await pool.query('select role,name,id from users where email =$1 and password=$2', [email, password])
        if (varified.rows.length === 0) {
            return res.status(400).json({ message: "user not found with this creantials" })
        }
        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }

        )
        res.send({ ...user.rows[0], token })
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

//patch request to update user details(user profile) by id

router.patch("/update/:id", verifyToken, Checkisactive, async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body

    try {
        const exitingUser = await pool.query("select id from users where id = $1", [id])

        if (exitingUser.rows.length === 0) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const fields = [];
        const values = [];
        let index = 1;

        if (name) {
            fields.push(`name = $${index}`);
            values.push(name);
            index++;
        }
        if (email) {
            fields.push(`email = $${index}`);
            values.push(email);
            index++;
        }

        if (password) {
            fields.push(`password = $${index}`);
            values.push(password);
            index++;
        }

        if (role) {
            if (role !== "employee" && role !== "admin") {
                return res.status(400).json({ message: "Role must be 'employee' or 'admin'" });
            }
            fields.push(`role = $${index}`);
            values.push(role);
            index++;
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields provided to update" });
        }

        values.push(id);

        const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING id, name, email, role
    `;

        const result = await pool.query(query, values);

        res.status(200).json({
            message: "User updated successfully",
            user: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// get request to retrieve all users

router.get('/get', verifyToken, async (req, res) => {
    try {
        const result = await pool.query("select * from users")
        res.send(result.rows)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" }, err.message)
    }

})

//get request to retrieve user by id

router.get('/getby/:id', verifyToken, Checkisactive, async (req, res) => {
    const { id } = req.params
    const existing = await pool.query("select id from users where id = $1", [id])

    if (existing.rows.length === 0) {
        return res.status(400).send({ message: "The User Not Existed" })
    }

    try {
        const result = await pool.query("select * from users where id = $1", [id])
        res.send(result.rows[0])
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" }, err.message)
    }

})

router.patch('/update-status-by/:id', verifyToken, Checkisactive, async (req, res) => {
    const { id } = req.params
    const { is_active } = req.body

    try {
        const existing = await pool.query("select id from users where id = $1", [id])
        if (existing.rows.length === 0) {
            return res.status(404).send({ message: "The Useer Not Existed" })
        }
        const result = await pool.query("update users set is_active= $1 where id = $2", [is_active, id])
        res.status(200).json({message:"update status successfully"})
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
})




export default router;