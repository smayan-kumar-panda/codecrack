import axios from "axios"


export const getJudge0LanguageId=(language)=>{
    const languageMap={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63  // JavaScript (Node.js 12.14.0)
    }

    return languageMap[language.toUpperCase()] || null  // this returns the value of the object with the specific key
    // and if the key is not available it returns null
    // this way we can add more languages in the code to support
} 

export const getLanguageName=(language_id)=>{
  const LANGUAGE_NAMES={
    71:"PYTHON",
    62:"JAVA",
    63:"JAVASCRIPT"
  }
  return LANGUAGE_NAMES[language_id] || "Unknown"
}


export const submitBatch=async (submissions)=>{

    // this hits a judge0 endpoint to submit the submissions in batch like this->
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

    try {
        console.log('Submitting to Judge0:', `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`)
        console.log('Submissions:', JSON.stringify(submissions, null, 2))
        
        
        const {data}=await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{submissions})
        return data;
    } catch (error) {
        console.error('Error submitting to Judge0:', error.message)
        if (error.response) {
            console.error('Response data:', error.response.data)
            console.error('Response status:', error.response.status)
        }
        
        // Fallback for development: return mock tokens
        // Fallback to local execution for development
        console.warn('Judge0 unavailable, falling back to local execution')
        return await executeLocally(submissions)
    }

    //data will return this-->
    // this give token for each indivisual submisisons in the batch like this-->
    /*[
  {
    "token": "db54881d-bcf5-4c7b-a2e3-d33fe7e25de7"
  },
  {
    "token": "ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1"
  },
  {
    "token": "1b35ec3b-5776-48ef-b646-d5522bdeb2cc"
  }
] */


}

const sleep=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms))

export const pollBatchResults=async (tokensArray)=>{

    while(true){
        
        try {
            console.log('Polling Judge0 for tokens:', tokensArray)
            const {data}=await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokensArray.join(","),
                base64_encoded:false,
            }
            })

        // here data contains something like this
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

    // now extract the submissions

    
    const results=data.submissions
    const isAllDone = results.every((i) => i.status.id !== 1 && i.status.id !== 2);


    
    if(isAllDone) return results
    await sleep(1000)  // since the loop continues infinitely until we keep gettin status=1 and 2 so we dont want to hit axios req every time but wiht the sleep function we wait 1sec before hitting the req again
    
        } 

        catch (error) {
            console.error('Error polling Judge0:', error.message)
            if (error.response) {
                console.error('Response data:', error.response.data)
                console.error('Response status:', error.response.status)
            }
        }

    }
}

//---------------------------------------------------------------------------------------
//! Topics covered till now
//? authentication of user or admin
//? creation of problems
// the next step is code execution
//* it means that when we give code to the judge0 then it checks the code and gives us
//* error or correct based on the solution

//? whenever we submit the code then it goes to judge0
//? when we created a new problem we passed "submissions" into "submitbatch" and got array of objects of tokens
//? similarly when the user submits code it goes to judge0
//? and it gives back token

//TODO a new schema will be created called "submission" this schema is for user and problem

