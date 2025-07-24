import express from "express"
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js"
import { createProblem, 
        getSolvedProblemsbyUser,
        getAllProblems,
        deleteProblemById,
        updateProblemById,
        getProblemById} from "../controllers/problem.controller.js"

const router=express.Router()

router.post("/create-problem",isLoggedIn,isAdmin,createProblem)
router.get("/get-all-problems",isLoggedIn,getAllProblems)
router.get("/get-problem/:id",isLoggedIn,getProblemById)
router.put("/update-problem/:id",isLoggedIn,isAdmin,updateProblemById)
router.delete("/delete-problem/:id",isLoggedIn,isAdmin,deleteProblemById)
router.get("/get-solved-problems",isLoggedIn,getSolvedProblemsbyUser)

export default router



//---------------------------------------------------------------------------------
//TODO
//? some of the prblem operations include-->
// create problem
// get all problems
// get problem by id
// update problems
// deleted problems
// get solved problems