import { verifyToken } from "../middleware/auth.js";
import Checkisactive from "../middleware/auth.js";
import { Router } from "express";
import pool from "../db.js"


const router = Router()

// post request to create a new leave request 

router.post("/post-request",verifyToken,Checkisactive, async (req, res) => {
    const {
        employee_id,
        leave_type,
        start_date,
        end_date,
        start_session = "full_day",
        end_session = "full_day",
        reason,
    } = req.body

    if (!employee_id || !leave_type || !start_date || !end_date) {             //check for required fields
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const employee = await pool.query("select id from users where id = $1", [employee_id])

        if (employee.rows.length === 0) {
            return res.status(404).json({ message: "Employee not found" })
        }

        const result = await pool.query(
            `
            insert into leave_requests
            (employee_id, leave_type, start_date, end_date,start_session, end_session, reason, status)
            values ($1, $2, $3, $4, $5, $6, $7, $8) returning *
            `, [
            employee_id,
            leave_type,
            start_date,
            end_date,
            start_session,
            end_session,
            reason,
            "pending",
        ]
        )
        res.status(201).json({
            message: "Leave request submitted successfully",
            leaveRequest: result.rows[0]
        })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
});

// get request to retrieve all leave requests

router.get("/get-requests",verifyToken,Checkisactive, async (req, res) => {
    try {
        const result = await pool.query(
            `select u.name,l.id, l.employee_id, l.leave_type,l.start_date,l.end_date,l.start_session,l.end_session,l.status,l.reason
            from users u join leave_requests l on u.id = l.employee_id
            `
        );

        res.send(result.rows)
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

// get request to retrieve leave request by id

router.get("/get-requestsby/:id",verifyToken,Checkisactive, async (req, res) => {
    const { id } = req.params

    try {
        const existing = await pool.query("select id from leave_requests where id = $1", [id])
        if (existing.rows.length === 0) {
            return res.status(404).json({ message: "The user with this id not found" })
        }
        const result = await pool.query("select * from leave_requests where employee_id = $1", [id])
        res.send(result.rows)
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

// delete request to delete leave request by id (it only capable to delete pending leave requests)

router.delete("/delete-leave-request/:id",verifyToken,Checkisactive, async (req, res) => {
    const { id } = req.params
    try {
        const leaveRequest = await pool.query("select id,status from leave_requests where id = $1", [id])
        if (leaveRequest.rows.length === 0) {
            return res.status(404).json({ message: "The leave request with this user not existed" })
        }
        if (leaveRequest.rows[0].status !== "pending") {
            return res.status(400).json({ message: "Can only cancel pending requests" })
        }
        const result = await pool.query("delete from leave_requests where id = $1", [id])
        res.status(200).json({ message: "Deleted the request successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

export default router   