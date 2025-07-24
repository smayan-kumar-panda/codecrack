import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware"
import {getAllPlaylists,getPlaylistById,createPlaylist,addProbleminPlaylist,deletePlaylist,removeProblemfromPlaylist} from "../controllers/playlist.controller.js"


const router=express.Router()

router.get("/",isLoggedIn,getAllPlaylists)
router.get("/:playlistId",isLoggedIn,getPlaylistById)
router.post("/create-playlist",isLoggedIn,createPlaylist)
router.post("/:playlistId/add-problem",isLoggedIn,addProbleminPlaylist)
router.delete("/:playlistId",isLoggedIn,deletePlaylist)
router.delete("/:playlistId/remove-problem",isLoggedIn,removeProblemfromPlaylist)

export default router