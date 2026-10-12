import express from "express"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import cors from "cors"
import usersRouter from "./routers/users.js";
import leaveSRouter from "./routers/leaverequests.js"
import leaveBalanceRouter from "./routers/leavebalances.js"

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users',usersRouter)
app.use('/emp',leaveSRouter)
app.use('/emp',leaveBalanceRouter)
app.listen(5000,()=>{
    console.log("server running on port 5000")
})