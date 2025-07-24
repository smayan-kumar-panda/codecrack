import { error } from "console"
import { PrismaClient ,UserRole,Difficulty} from "../generated/prisma/index.js"
import { getJudge0LanguageId ,submitBatch,pollBatchResults} from "../lib/judge0.lib.js"
import axios from "axios"

const prisma=new PrismaClient()

export const createProblem=async (req,res)=>{
    // get all the data from req.body
    const {title, description, difficulty,tags,examples,constraints,testcases ,codeSnippet,referenceSolution}=req.body


    //? in the above lines we pass this values in postman to create a problem , the 
    //? reference soltuion part in the code contains the solution of the problem
    //? in a variety of languages
    //? when we will create "reference solution" then we will add the the fields "language" and "solutionCode" init
    //? just like we create const {name,email}=req.body in auth controllers similarly
    //? we can create this fields in refernce solution and get them using the same name



    // going to check again if user is admin
    if(req.user.role!="ADMIN"){
        return res.status(403).json({message:"You are not allowed to create a problem"})
    }

    // loop through each  reference solution for diffrent languages
    // to get the code for each language
    try{

        //refernce solution is an object
        /*
        {
        python:    "def solve(): …",
        javascript: "function solve() { … }",
        java:       "public class Main { … }"
        }
        */

        for(const[ language, solutionCode ] of Object.entries(referenceSolution)){

            //the above loop converts "referenceSolution" object to an array of arrays
            /*
            [
        ["python", "def solve():\n  print('Hello')"],
        ["javascript", "function solve() { console.log('Hello'); }"],
        ["java", "public class Main { public static void main(String[] args) { System.out.println('Hello'); } }"]
        ]
            */

            const languageId=getJudge0LanguageId(language)  // getting a language from refernce solution

            if (!languageId){
                return res.status(400).json({message:`Language ${language} is not supported`})
            }

            //testcases is an array of objects
            // eg- {[input:"",output:""],[input:"",output:""],[input:"",output:""]}

            /*
            const testcases = [
            { input: "1 2", output: "3" },
            { input: "10 15", output: "25" }
            ];
            */


            const submissions=testcases.map(
                ({input,output})=>({
                source_code:solutionCode,  
                language_id:languageId,
                stdin:input,
                expected_output:output
            })
        )
        // submissions will look something like this
        /*
        [
    {
    "source_code": "def solve():\n  x, y = map(int, input().split())\n  print(x + y)",
    "language_id": 71,
    "stdin": "1 2",
    "expected_output": "3"
    },
    {
    "source_code": "def solve():\n  x, y = map(int, input().split())\n  print(x + y)",
    "language_id": 71,
    "stdin": "10 15",
    "expected_output": "25"
    }
    ]

        */
        // we will send the submissions in batches so 
        // submitBatch in judge0.lib.js
        const submissionsResult=await submitBatch(submissions)
        // the above code generates the array of tokens [{token},{token},{token}]

        const tokensArray=submissionsResult.map((res)=>res.token)
        // the above code puts each token in an array [token,token,token]

        const results=await pollBatchResults(tokensArray)

        

        // below result= data.submissions from pollbatch method-->
        for (let i = 0; i < results.length; i++) {
            
            const result = results[i];
            console.log("Result -------",result)
            console.log(`testcase ${i+1} and language ${language} ---- result ${JSON.stringify(result.status.description)}`)

            if (result.status.id !== 3) {  
                return res.status(400).json({
                error:`Testcases ${i+1} failed for language ${language}`,
                })
            }

        }



        const newProblem=await prisma.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippet,
                referenceSolution,
                userId:req.user.id
            },
        })

        return res.status(201).json({
            success:true,
            message:"Message completed Successfully",
            problem: newProblem
        })
        
    }
    
} catch(error){
    // handle unexpected errors
    console.error("Error creating problem: ", error);
    return res.status(500).json({message:"Error creating problem"})

}
}

export const getAllProblems=async (req,res)=>{
    // get all the problems
    // use findMany
    //? since we are logged in by a user(who is admin) when we do getALLProblems we get all the problems 
    //? created by that user and worldwide


    try{
        const problems=await prisma.problem.findMany()

        if(!problems){
            return res.status(400).json({
                error:"No problems found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Message fetched Successfully",
            problem: problems
        })
    }
    catch(error){
        console.error("Error fetching problem: ", error);
    return res.status(500).json({message:"Error fetching problem"})
    }
}

export const getProblemById=async (req,res)=>{
    const {id}=req.params
    try{
        const problem1=await prisma.problem.findUnique({
            where:{
                id:id
            }
        })
        if(!problem1){
            return res.status(404).json({
                error:"Problem not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Message fetched Successfully",
            problem: problem1
        })
    }
    catch(error){
        console.error("Error fetching problem: ", error); 
        return res.status(500).json({message:"Error fetching problem"})
    }
}

export const updateProblemById=async (req,res)=>{

    const {id}=req.params
    if(!id){
        return res.status(400).json({
            error:"problem id not found so problem does not exist"
        })
    }


    const {title, description, difficulty,tags,examples,constraints,testcases ,codeSnippet,referenceSolution}=req.body

    // this below line is already checked in middleware but we are checking it again for extra precaution
    if(req.user.role!="ADMIN"){
        return res.status(403).json({message:"You are not allowed to create a problem"})
    }

    try{
        for(const [language,solutionCode] of Object.entries(referenceSolution)){
            const languageId=getJudge0LanguageId(language)

            if(!languageId){
                return res.status(400).json({message:`Language ${language} is not supported`})
            }

            const submissions=testcases.map(
                ({input,output})=>({
                    source_code:solutionCode,  
                    language_id:languageId,
                    stdin:input,
                    expected_output:output,
                })
            )

            const arrayofObjectofTokenIds=await submitBatch(submissions)
            const tokensArray=arrayofObjectofTokenIds.map((i)=>i.token)
            const results=await pollBatchResults(tokensArray)

            for (let i = 0; i < results.length; i++) {
            
            const result = results[i];
            console.log("Result -------",result)
            console.log(`testcase ${i+1} and language ${language} ---- result ${JSON.stringify(result.status.description)}`)

            if (result.status.id !== 3) {  
                return res.status(400).json({
                error:`Testcases ${i+1} failed for language ${language}`,
                })
            }
            }
            const updatedProblem=await prisma.problem.update({
                where:{
                    id:id
                },
                data:{
                    title,
                    description,
                    difficulty,
                    tags,
                    examples,
                    constraints,
                    testcases,
                    codeSnippet,
                    referenceSolution,
                    userId:req.user.id
                }
            })

            return res.status(201).json({
            success:true,
            message:"Message completed Successfully",
            problem: updatedProblem
            })
        }
    }

    catch(error){
        console.error("Error creating problem: ", error);
        return res.status(500).json({message:"Error creating problem"})

    }
}

export const deleteProblemById=async (req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({
            error:"Problem id not found to delete"
        })
    }

    try{
        const problem=await prisma.problem.findUnique({
        where:{
            id:id
        }
    })
    if(!problem){
        return res.status(404).json({
            error:"Problem not found"
        })
    }

    await prisma.problem.delete({
        where:{
            id:id
        }
    })

    res.status(200).json({
            success:true,
            message:"Problem deleted successfully",
        })
    }

    catch(error){
        console.error("Error deleting problem: ", error); 
        return res.status(500).json({message:"Error deleting problem"})
    }

}

// this controller gives all the solved problems by the logged in user
export const getSolvedProblemsbyUser=async (req,res)=>{
    try{
        const problems=await prisma.problem.findMany({
            // finding the particular user whose solved problems we want to see
            where:{
                solvedBy:{
                    some:{
                        userId:req.user.id
                    }
                }
                // finding the problems solved by that user only
            },
            include:{
                solvedBy:{
                    where:{
                        userId:req.user.id
                    }
                }
            }
        })

        res.status(200).json({
            success:true,
            message:"Problems fetched successfully",
            problems:problems
        })
    }

    catch(error){
        console.error("Error fetching problems problem: ", error); 
        return res.status(500).json({message:"EError fetching problems problem"})
    }
}


//---------------------------------------------------------------------------------
//TODO
//? some of the prblem operations include-->
// create problem
// get all problems
// get problem by id
// update problems
// deleted problems
// get solved problems