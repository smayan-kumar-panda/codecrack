import jwt from "jsonwebtoken"
import Prisma from "../generated/prisma/index.js"
import {PrismaClient, UserRole} from "../generated/prisma/index.js"

const prisma = new PrismaClient()


export const isLoggedIn=async (req,res,next)=>{
    try{

        //taking token from the cookies
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({
                message:"unauthorised access no token found"
            })
        }
        let decoded

        try{
            //verifying that token
            decoded=jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(error){
            return res.status(401).json({
                message:"unauthorised access invalid token"
            })
        }
        const user=await prisma.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true
            }
        })
        if(!user){
            return res.status(401).json({
                message:"unauthorised access user not found"
            })
        }

        //finding the user after decoding the token
        // finding the user info in db
        // putting the user value in the req.user
        req.user=user
        next()

    }
    catch(error){
        console.error("Error authenticating user: ", error);
        return res.status(500).json({
            message:"unauthorised access"
        })
    }
}

//---------------------------------------------------------------------------------------
export const isAdmin=async(req,res,next)=>{
    try{
        const userId=req.user.id
        const user= await prisma.user.findUnique({
            where:{
                id:userId,
            },
            select:{
                role:true  
            }
        })

        if(!user || user.role!=="ADMIN")
            {  
            // finding the role of user in db is called r-check== role-based access
            return res.status(400).json({
                message:"Access denied admins only"
            })
        }
        next()

    }
    catch(error){
        return res.status(500).json({
            message:"Error occured while confirming admin or user"
        })
    }
}