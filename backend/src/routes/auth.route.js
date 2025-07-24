import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"


const router=express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", isLoggedIn,logout)
router.get("/check", isLoggedIn ,check)

export default router