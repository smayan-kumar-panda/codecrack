import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import {getAllSubmissions,getSubmissionforProblemId,getSubmissionsCount} from "../controllers/submission.controller.js"

const router=express.Router()

router.get("/get-all-submissions",isLoggedIn,getAllSubmissions)
router.get("/get-submission/:problemId",isLoggedIn,getSubmissionforProblemId)
router.get("/get-submissionscount/:problemId",isLoggedIn,getSubmissionsCount)

export default router