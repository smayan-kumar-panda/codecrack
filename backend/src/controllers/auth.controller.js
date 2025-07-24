import {PrismaClient, UserRole} from "../generated/prisma/index.js"
//import { PrismaClient } from "@prisma/client/index.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const prisma = new PrismaClient()

export const register = async (req, res) => {
    const {name, email, password} = req.body
    
    try{
        const existingUser=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role:UserRole.USER
            }
        })
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})

        
        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development",
            maxAge:24*60*60*1000
        })

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })


    }
    catch(error){
        console.error("Error creating user: ", error);
        return res.status(400).json({
            message:"user not created successfully"
        })
    }
}

export const login=async (req,res)=>{
    const {email,password}=req.body

    try{
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }


        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development",
            maxAge:24*60*60*1000
        })

        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }
    catch(error){
        console.error("Error logging in user: ", error);
        return res.status(400).json({
            message:"user not logged in successfully"
        })
    }
}

export const logout=async (req,res)=>{
    try{

        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development"
        })


        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    }
    catch(error){
        console.error("Error logging out user: ", error);
        return res.status(400).json({
            message:"user not logged out successfully"
        })
    }
}

export const check=async (req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message:"User authenticated successfully",
            user:req.user
        })
    }
    catch{
        console.error("Error checking user: ", error);
        return res.status(500).json({
            message:"Error checking user"
        })
    }
}