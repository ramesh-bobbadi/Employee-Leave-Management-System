import pool from "../db.js";
import {Router} from "express";

const router = Router()

// calculate total leave days based on start date, end date, and session types (full day, first half, second half)

const calculateTodalDays = (start_date, end_date, start_session, end_session) => {
    const start = new Date(start_date)
    const end = new Date(end_date)
    const fulldays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    if (fulldays === 0) {
        if (start_session === "first_half" || start_session === "second_half") {
            return 0.5
        }
        return 1
    }
    if (fulldays === 1 || fulldays > 1) {
        let totaldays = fulldays + 1
        if (start_session === "first_half" || start_session === "second_half") {
            totaldays -= 0.5
        }
        if (end_session === "first_half" || end_session === "second_half") {
            totaldays -= 0.5
        }
        return totaldays
    }
}

// patch request to update leave request status by id (only superusers(admin) can update)

router.patch("/update-leave-status/:id", async (req, res) => {
    const { id } = req.params
    const { status, admin_comments} = req.body;
    if (!status || !["approved", "rejected", "pending"].includes(status)) {                // check if status must be approve or rejected
        return res.status(400).json({ message: "Status must be 'approved' or 'rejected'" })
    }
    try {
        const leaveRequest = await pool.query("select * from leave_requests where id = $1", [id]);
        if (leaveRequest.rows.length === 0) {
            return res.status(404).json({ message: "Leave request not found" })
        }
        const leave = leaveRequest.rows[0]
        if (status === "rejected") {
            const updateResult = await pool.query(
                `update leave_requests
             set status = $1, admin_comments = $2
             where id = $3 returning *`,
                [status, admin_comments || null, id]
            )

            return res.status(200).json({
                message: `Leave request ${status} successfully`,
                leaveRequest: updateResult.rows[0],
            });
        }
        if (status === "pending") {
            const updateResult = await pool.query(
                `update leave_requests
                set status = $1, admin_comments = $2
                where id = $3 returning *
                `,[status, admin_comments || null,id]
            )
        }
        const leaveDays = calculateTodalDays(                  // call the function to calculate total leave days
            leave.start_date,
            leave.end_date,
            leave.start_session,
            leave.end_session
        );
        const currentTotal = parseFloat(leave.total_days) || 0;
        const remainingDays = currentTotal - leaveDays

        if(remainingDays < 0){                               // aditional check to ensure that leave balance is sufficient for the requested leave days
            return res.status(400).json({
                message: `Insufficient leave balance. Available:${currentTotal}, Requested: ${leaveDays}`
            })
        }
        const updateResult = await pool.query(

            `update leave_requests
            set status = $1, admin_comments = $2, remaining_days = $3
            where id = $4 returning *
            `,[status,admin_comments || null, remainingDays, id]
        )
        res.status(200).json({
            message: "Leave request approved successfully",
            leaveRequest: updateResult.rows[0],
            balance_days : remainingDays
        })
    
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

});


export default router;