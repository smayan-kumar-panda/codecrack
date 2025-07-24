import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import { executeCode } from "../controllers/executeCode.controller.js"

const router=express.Router()

router.post("/",isLoggedIn,executeCode)

export default router