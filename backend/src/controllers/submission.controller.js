import {PrismaClient} from "../generated/prisma/index.js"

const prisma=new PrismaClient()

export const getAllSubmissions=async (req,res)=>{
    try{
        const userId=req.user.id

        const submission=await prisma.submission.findMany({
            where:{
                userId:userId
            }
        })
        res.status(200).json({
            success:true,
            message:"Submissions fetched successfully",
            submission:submission
        })
    }

    catch(error){
        console.error("Error fetching submissions: ", error);
        return res.status(500).json({
            message:"Error fetching submissions"
        }) 
    }
}

export const getSubmissionforProblemId=async (req,res)=>{
    try{
        const userId=req.user.id
        const problemId=req.params.problemId

        const submission=await prisma.submission.findMany({
            where:{
                userId:userId,
                problemId:problemId
            }
        })

        res.status(200).json({
            success:true,
            message:"This submission is fetched successfully",
            submission:submission
        })
    }
    catch(error){
        console.error("Error fetching submission: ", error);
        return res.status(500).json({
            message:"Error fetching submission"
        }) 
    }
}

export const getSubmissionsCount=async (req,res)=>{
    try{
        const problemId=req.params.problemId
        const submission=await prisma.submission.count({
            where:{
                problemId:problemId
            }
        })

        res.status(200).json({
            success:true,
            message:"Submission count fetched successfully",
            submissionCount:submission
        })
    }

    catch(error){
        console.error("Error fetching submission count : ", error);
        return res.status(500).json({
            message:"Error fetching submission Count"
        }) 
    }
}