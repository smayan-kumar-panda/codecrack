import { json } from "express"
import {PrismaClient} from "../generated/prisma/index.js"

const prisma=new PrismaClient()

export const getAllPlaylists=async (req,res)=>{
    try{
        const playlists=await prisma.playlist.findMany({
            where:{
                userId:req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })

        res.status(200).json({
            success:true,
            message:"Playlists fetched successfully",
            playlists:playlists
        })
    }

    catch(error){
        console.error("error while fetching Playlists ",error)
        res.status(500).json({
            error:"Failed to fetch Playlists"
        })
    }
}

export const getPlaylistById=async (req,res)=>{
    try{
        const {playlistId}=req.params

        const playlist=await prisma.playlist.findUnique({
            where:{
                id:playlistId,
                userId:req.user.id,
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })

        if(!playlist){
            return res.status(404).json({error:"Playlist not found"})
        }

        res.status(200).json({
            success:true,
            message:"Playlists fetched successfully",
            playlists:playlist
        })
    }

    catch(error){
        console.error("error while fetching Playlist ",error)
        res.status(500).json({
            error:"Failed to fetch Playlist"
        })
    }
}

export const createPlaylist=async (req,res)=>{
    try{
        const {name,description}=req.body
        const userId=req.user.id

        const playlist=await prisma.playlist.create({
            data:{
                name,
                description,
                userId
            }
        })

        res.status(200).json({
            success:true,
            message:"Playlist created successfully",
            playlist:playlist
        })
    }

    catch(error){
        console.error("error while creating Playlist ",error)
        res.status(500).json({
            error:"Failed to create Playlist"
        })
    }
}

export const addProbleminPlaylist=async (req,res)=>{
    try{
        const {playlistId}=req.params
        const {problemIds}=req.body  // an array

        if(!Array.isArray(problemIds) || problemIds.length===0){
            return res.status(400).json({
                error:"Invalid or missing problemIds"
            })
        }

        const problemsinPlaylist=await prisma.problemsinPlaylist.createMany({
            data:problemIds.map((problemId)=>{
                playlistId,
                problemId
            })
        })

        res.status(201).json({
            success:true,
            message:"Playlist created successfully",
            problemsAdded:problemsinPlaylist
        })
    }

    catch(error){
        console.error("error while adding problems ",error)
        res.status(500).json({
            error:"error while adding problems"
        })
    }
}

export const deletePlaylist=async (req,res)=>{
    try{
        const {playlistId}=req.params

        const deleted=await prisma.playlist.delete({
            where:{
                id:playlistId
            }
        })

        res.status(200).json({
            success:true,
            message:"Playlist deleted successfully",
            deletedPlaylist:deleted
        })
    }

    catch(error){
        console.error("error deleting playlist ",error)
        res.status(500).json({
            error:"error deleting playlist"
        })
    }
}

export const removeProblemfromPlaylist=async (req,res)=>{
    try{
        const {playlistId}=req.params
        const {problemIds}=req.body  // array of problem ids

        const deletedProblem=await prisma.problemsinPlaylist.deleteMany({
            where:{
                playlistId,
                problemId:{
                    in:problemIds
                }
            }
        })

        res.status(200).json({
            success:true,
            message:"Problems deleted successfully",
            deletedProblems:deletedProblem
        })
    }

    catch(error){
        console.error("error deleting problems ",error)
        res.status(500).json({
            error:"error deleting problems"
        })
    }
}