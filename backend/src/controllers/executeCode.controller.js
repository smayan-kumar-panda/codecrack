import { pollBatchResults, submitBatch, getLanguageName } from "../lib/judge0.lib.js"
import {PrismaClient} from "../generated/prisma/index.js"


//! SIMILARITY TO CREATE-PROBLEM CONTROLLER
// execute code is very similar to create problem there we had to create a problem
// from scratch and provide the question , description , test cases and reference solution, 
// code snippet and constraints etc, but here we only need to provide the submission part
// of the create problem controller and the problem id and we create the submissions
// array like there using the input only here and want judge0 to provide the output based on the input
// there we had to provide the output as well but here we only need to provide the input
// after creating the submissions we use the submitBatch method and then we use the pollBatchResults method
// like there ,to get the results(results is an array of test cases with status.id===3) of the submissions

//* the result shows if the test cases are passed or not

const prisma=new PrismaClient()

export const executeCode=async (req,res)=>{

    // execute code controller does both run and submit code unlike leetcode
    try{
        // below inputs are brought from-->
        /**
         * const submissions=testcases.map(
                ({input,output})=>({
                source_code:solutionCode,  
                language_id:languageId,
                stdin:input,
                expected_output:output
            })
        )
         */


        //-----------------------------------------------------------------------------
        /**
 * Parameters for executeCode controller
 * 
 * @param {string} source_code - The user's code solution to be executed.
 * 
 * Example:
 * "function add(a, b) { return a + b; }"
 * or
 * "def add(a, b):\n    return a + b"
 * 
 * @param {number} language_id - The ID representing the programming language.
 * 
 * Examples:
 * - `63` for JavaScript (Node.js)
 * - `71` for Python 3
 * - `54` for C++
 * - `62` for Java
 * 
 * @param {Array<string>} stdin - The input data to be passed to the program for each test case.
 * 
 * Example:
 * ["1 2", "10 15", "5 7"]
 * 
 * Note: Each string represents input for one test case.
 * 
 * @param {Array<string>} expected_output - The result expected from the program's execution for each input.
 * 
 * Example:
 * ["3", "25", "12"]
 * 
 * Note: Must have the same length as stdin array.
 * 
 * @param {string|number} problemId - The identifier for the coding problem.
 * 
 * Example:
 * "problem_123"
 * or
 * 456
 * 
 * Additional Context:
 * - `stdin[x]` should produce `expected_output[x]`. 
 *   For example:
 *   - `stdin[0]` ("1 2") should produce `expected_output[0]` ("3").
 *   - `stdin[1]` ("10 15") should produce `expected_output[1]` ("25").
 */
        //-----------------------------------------------------------------------------


        const {source_code,language_id,stdin,expected_output,problemId}=req.body

         // TODO: Extract necessary data from the request body
        
        /**
         * @param {string} source_code - The user's code solution to be executed.
         * @param {number} language_id - The ID representing the programming language.
         * @param {string} stdin - The input data to be passed to the program.
         * @param {string} expected_output - The result expected from the program's execution.
         * @param {string|number} problemId - The identifier for the coding problem.
         */

        const userId = req.user.id

        // validate test cases
        // in the test cases the structure is
        /**
         * const testcases = [
            { input: "1 2", output: "3" },
            { input: "10 15", output: "25" }
            ];
         */

        if(
            !Array.isArray(stdin) ||
            stdin.length===0 ||
            !Array.isArray(expected_output) ||
            stdin.length !== expected_output.length  
            //•  stdin[0] ("1 2") should produce expected_output[0] ("3")
            //•  stdin[1] ("10 15") should produce expected_output[1] ("25")
            //stdin becomes an array of inputs: ["1 2", "10 15", "5 7"]
            //•  expected_output becomes an array of expected outputs: ["3", "25", "12"]

        ){
            return res.status(400).json({
                error:"Invalid or missing test cases"
            })
        }

        //prepare each testcases for judge0 batch submission(similar to create problem)

        // here the user provided code is checked with each test case which is in array format
        const submissions=stdin.map((input)=>({
            source_code,
            language_id,
            stdin:input,
        })) 


        // send this batch of submissions to judge0
        const submitResponse=await submitBatch(submissions) //gives an array of objects of token
        const tokensArray=submitResponse.map((i)=>i.token)  // give an array of tokens
        const results=await pollBatchResults(tokensArray) 


        // after polling the data results looks something likes this
        /**
        {
    "submissions": [
    {
    "language_id": 46,
    "stdout": "hello from Bash\n",
    "status_id": 3,
    "stderr": null,
    "token": "db54881d-bcf5-4c7b-a2e3-d33fe7e25de7"
    },
    {
    "language_id": 71,
    "stdout": "hello from Python\n",
    "status_id": 3,
    "stderr": null,
    "token": "ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1"
    },
    {
    "language_id": 72,
    "stdout": "hello from Ruby\n",
    "status_id": 3,
    "stderr": null,
    "token": "1b35ec3b-5776-48ef-b646-d5522bdeb2cc"
    }
    ]
}

         */

        console.log("result----------------")
        console.log(results)
        /**
         * this gives something like this
         *
         * {
    stdout: '20\n',
    time: '0.069',
    memory: 0,
    stderr: null,
    token: 'def71bc2-7558-4c40-bb71-c741733afe62',
    compile_output: null,
    message: null,
    status: { id: 3, description: 'Accepted' }
  },{...},{...}
         */
        console.log("result----------------")

        // the results will give the following result-->
        // these are basically showing all the passed testcases , which are accepted by the user provided code

        /**
         * testcases-result-->
         * [
  {
    token: 'mock-token-1753196849843-0',
    status: { id: 3, description: 'Accepted' },
    stdout: '300\n',
    stderr: null,
    time: '0.01',
    memory: 1024
  },
  {
    token: 'mock-token-1753196849843-1',
    status: { id: 3, description: 'Accepted' },
    stdout: '300\n',
    stderr: null,
    time: '0.01',
    memory: 1024
  },
  {
    token: 'mock-token-1753196849843-2',
    status: { id: 3, description: 'Accepted' },
    stdout: '300\n',
    stderr: null,
    time: '0.01',
    memory: 1024
  }
]
result----------------
PS C:\Users\KIIT\Desktop\Every desktop app\Computer Science\Web Dev\LeetLab\backend>
  {
    token: 'mock-token-1753196849843-2',
    status: { id: 3, description: 'Accepted' },
    stdout: '300\n',
    stderr: null,
  {
    token: 'mock-token-1753196849843-2',
    status: { id: 3, description: 'Accepted' },
  {
    token: 'mock-token-1753196849843-2',
  {
  {
    token: 'mock-token-1753196849843-2',
    status: { id: 3, description: 'Accepted' },
    stdout: '300\n',
  {
  {
    token: 'mock-token-1753196849843-2',
    status: { id: 3, description: 'Accepted' },
    stdout: '300\n',
    stderr: null,
    time: '0.01',
    memory: 1024
  }
]
         */

        // now we analyse the testcases
        // and compare the stdout(standard output) with the expected_output (user provided output)
        // and check if they are same

        let allPassed=true
        const detailedResults=results.map((result,i)=>{
            const stdout=result.stdout?.trim()
            const expected_output1=expected_output[i]?.trim()
            const passed= stdout===expected_output1

            if(!passed){
              allPassed=false
            }

            //return the details about testcases 
            // returning all the values of tescaseResults schema from prisma schema
            return{
              testCase:i+1,
              passed,
              stdout,
              expected_Output:expected_output1,
              stderr:result.stderr || null,
              compile_output:result.compile_output || null,
              status:result.status.description,
              memory:result.memory !== undefined && result.memory !== null ? `${result.memory} KB` : 'N/A',
              time:result.time? `${result.time} sec`: undefined
            }

            console.log(`TestCase #${i+1}`)
            console.log(`stdin for testcase${i+1}: ${stdin[i]}`)
            console.log(`stdout for testcase${i+1}: ${stdout}`)
            console.log(`expected_output for testcase${i+1}: ${expected_output1}`)
            console.log(`matched testcase for testcase${i+1} : ${passed}`)
            console.log("-----------------------------------")
        })

        console.log(detailedResults);  // this shows the array of objects of testcases having same parameters as testCaseResults schema

        // multiple submissions can be done by a user
        // multiple submission can be stored under a single problem
        // so they are given in arrays in user and problem schema
        // submission schema combines and stores all the testcases in array format-->

        //* after getting the "results" first submit in submission schema
        //* then submit in "problem solved schema"(if all testcases passed)
        //* then submit in "testCaseresults" schema

        const submission=await prisma.submission.create({
          data:{
            userId,
            problemId,
            sourceCode:source_code,
            language:getLanguageName(language_id),
            stdin:stdin.join("\n"), 
            stdout:JSON.stringify(detailedResults.map((r)=>r.stdout)),
            stderr:detailedResults.some((r)=>r.stderr)?JSON.stringify(detailedResults.map((r)=>r.stderr)) : null,
            compileOutput:detailedResults.some((r)=>r.compile_output)? JSON.stringify(detailedResults.map((r)=>r.compile_output)) : "",
            status:allPassed? "Accepted": "Wrong answer",
            memory:JSON.stringify(detailedResults.map((r)=>r.memory)),
            time:JSON.stringify(detailedResults.map((r)=>r.time)),
          }
        })


        // if allPassed== true mark problem solved for the user
        // upsert- if record does not exist create it ortherwise update it
        if(allPassed){
          // upsert is like update+insert
          await prisma.problemSolved.upsert({
            where:{
              userId_problemId:{
                userId,
                problemId
              }
            },
            update:{},  // we are not updating everytime because the user code if correct is stored in the db only once mutiple correct codes are not stored in this table
            // but if not submitted then it is updated
            create:{
              userId,
              problemId
            }
          })
        }



        // save indivisual testcases using detailed results
        const testCaseResults=detailedResults.map((result)=>({
          submissionId:submission.id,  // uss particular submission ke test cases h yeh sb(every submission will have its own test cases)
          testCase:result.testCase,
          passed:result.passed,
          stdout:result.stdout || "",
          expected:result.expected_Output || "",
          stderr:result.stderr,
          compileOutput:result.compile_output,
          status:result.status,
          memory:result.memory || "",
          time:result.time || ""
        }))

        // createMany: this creates many indivisual testcase results in their respective submission ids
        await prisma.testCaseResult.createMany({
          data:testCaseResults
        })
        
        const submissionWithTestCases=await prisma.submission.findUnique({
          where:{
            id:submission.id
          },
          include:{
            testCases:true  // this will give the testcases in the form of array in the submission schema
          }

        })


        res.status(200).json({
            success:true,
            message:"Code executed successfully",
            submission:submissionWithTestCases
        })

        /**
         *  this is the final output when user submits a code
         * {
    "message": "Code executed successfully",
    "submission": {
        "id": "5fe036a0-3f94-4a10-aade-69e1c69fb5f0",  //? submission id
        "userId": "44ad6c7d-46a2-463f-b763-74c931e178f8",
        "problemId": "b74f7c7a-5ef2-4f13-a8fb-eab39fc8348f",
        "sourceCode": "const input = require('fs').readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(Math.max(a, b));",
        "language": "JAVASCRIPT",
        "stdin": "10 20\n-50 -10\n0 0",
        "stdout": "[\"20\",\"-10\",\"0\"]",
        "stderr": null,
        "compileOutput": "",
        "status": "Accepted",
        "memory": "[\"0 KB\",\"0 KB\",\"0 KB\"]",
        "time": "[\"0.039 sec\",\"0.035 sec\",\"0.034 sec\"]",
        "createdAt": "2025-07-24T05:48:28.043Z",
        "updatedAt": "2025-07-24T05:48:28.043Z",
        "testCases": [
            {
                "id": "554279c0-cdfd-4285-9dff-36199967c564",
                "submissionId": "5fe036a0-3f94-4a10-aade-69e1c69fb5f0",
                "testCase": 1,
                "passed": true,
                "stdout": "20",
                "expected": "20",
                "stderr": null,
                "compileOutput": null,
                "status": "Accepted",
                "memory": "0 KB",
                "time": "0.039 sec",
                "createdAt": "2025-07-24T05:48:28.087Z",
                "updatedAt": "2025-07-24T05:48:28.087Z"
            },
            {
                "id": "69fe99f0-77c6-4f61-be0c-2f509859bdcd",
                "submissionId": "5fe036a0-3f94-4a10-aade-69e1c69fb5f0",
                "testCase": 2,
                "passed": true,
                "stdout": "-10",
                "expected": "-10",
                "stderr": null,
                "compileOutput": null,
                "status": "Accepted",
                "memory": "0 KB",
                "time": "0.035 sec",
                "createdAt": "2025-07-24T05:48:28.087Z",
                "updatedAt": "2025-07-24T05:48:28.087Z"
            },
            {
                "id": "b092befe-1848-443d-8bbd-502655e9af5d",
                "submissionId": "5fe036a0-3f94-4a10-aade-69e1c69fb5f0",
                "testCase": 3,
                "passed": true,
                "stdout": "0",
                "expected": "0",
                "stderr": null,
                "compileOutput": null,
                "status": "Accepted",
                "memory": "0 KB",
                "time": "0.034 sec",
                "createdAt": "2025-07-24T05:48:28.087Z",
                "updatedAt": "2025-07-24T05:48:28.087Z"
            }
        ]
    }
}
         */

    }

    catch(error){
        console.log(error)
        res.status(500).json({
            error:"code did not execute successfully"
        })
    }
    
}