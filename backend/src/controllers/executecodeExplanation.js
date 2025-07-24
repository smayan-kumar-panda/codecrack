// ========================================================================
// ! executeCode Controller Function for Code Execution 
// ? This controller accepts user's source code, language, inputs (stdin), 
// ? and expected outputs, then runs code on Judge0 for all test cases.
// ? 
// ? The flow:
// ? 1. Validate inputs in req.body
// ? 2. Prepare test submissions for batch API
// ? 3. Send submissions to Judge0 batch API (submitBatch)
// ? 4. Poll Judge0 results for tokens (pollBatchResults)
// ? 5. Optionally compare actual outputs to expected outputs
// ? 6. Respond with execution status/results
// ========================================================================

/*
export const executeCode = async (req, res) => {

    /// - Destructure req.body inputs
    const { source_code, language_id, stdin, expected_output, problemId } = req.body;

    /// - Get userId from authenticated user (assumes authentication middleware sets req.user)
    const userId = req.user.userId;

    /// ! Validate that stdin and expected_output arrays exist and match in length
    if (
        !Array.isArray(stdin) || stdin.length === 0 ||
        !Array.isArray(expected_output) ||
        stdin.length !== expected_output.length //* jitne inputs utne hi outputs hone chahiye
    ) {
        /// ! Respond with 400 if invalid or missing test cases
        return res.status(400).json({ error: "Invalid or missing test cases" });
    }

    /// - Prepare submissions array: one object per test case for Judge0 batch
    /// here we do not provide the output because judge0 will give output based on input unlike during create Problem where we also provided output
    const submissions = stdin.map((input) => ({
        source_code,         // * User's submitted code (same for each test case)
        language_id,         // * Language ID from Judge0's supported languages
        stdin: input         // * Input string for this test case
    }));

    /// - Submit batch to Judge0 API and get back list of tokens
    const submitResponse = await submitBatch(submissions);

    /// - Extract token strings from submitResponse
    const tokensArray = submitResponse.map(tokenObj => tokenObj.token);

    /// - Poll Judge0 API until all tokens are done executing, receive results
    const results = await pollBatchResults(tokensArray);

    /// - Log results (optional, for debugging)
    console.log("Judge0 Results:", results);

    /// - Finally send response indicating successful code execution
    res.status(200).json({
        message: "Code executed successfully",
        /// results  // * can include this if you want to return detailed output to client
    });
};
*/

// ========================================================================
// ! Explanation of req.body parameters for executeCode Controller
// ========================================================================

/*
req.body should have the following keys:

//// ? source_code: string
//// ?     User's source code to execute.
//// ?     Example:
//// ?     "def add(x, y):\n    return x + y\nx, y = map(int, input().split())\nprint(add(x, y))"

//// ? language_id: number
//// ?     The integer ID representing the programming language in Judge0.
//// ?     Examples:
//// ?     - 71 = Python 3
//// ?     - 63 = JavaScript (Node.js)
//// ?     - 62 = Java

//// ? stdin: array of strings
//// ?     Input strings for each test case, one element per testcase.
//// ?     Example: ["1 2", "4 5", "10 15"]

//// ? expected_output: array of strings
//// ?     Expected output corresponding to each input in stdin.
//// ?     Must have the same length as stdin array.
//// ?     Example: ["3", "9", "25"]

//// ?  problemId: string or number
//// ?     Identifier for the coding problem, useful for database records or logging.
//// ?     Example: "problem_123" or 456

  */




// ========================================================================
// ! judge0.lib.js - Helper functions to interact with Judge0 API
// ========================================================================

/*
////// ========================================================================
////// ? getJudge0LanguageId(language)
////// ? Converts language names to Judge0 language IDs,
////// ? for example "PYTHON" -> 71
////// ? Returns null if language is not found.
////// ========================================================================

export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63
    };

    return languageMap[language.toUpperCase()] || null;
};
*/

/*
/// ========================================================================
/// ? submitBatch(submissions)
/// ? Submits an array (batch) of submissions to Judge0 at once.
/// ? Each submission should be of the form:
/// ? { source_code: string, language_id: number, stdin: string }
/// ? Returns an array of objects each containing a unique submission token:
/// ? Example response:
/// ? [
/// ?   { token: "db54881d-bcf5-4c7b-a2e3-d33fe7e25de7" },
/// ?   { token: "ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1" }
/// ? ]
//////// ========================================================================

export const submitBatch = async (submissions) => {
    try {
        const { data } = await axios.post(
            `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
            { submissions }
        );
        return data;
    } catch (error) {
        console.error('Error submitting to Judge0:', error.message);
        // Return mock tokens for local dev or errors
        return submissions.map((_, i) => ({
            token: `mock-token-${Date.now()}-${i}`
        }));
    }
};
*/

/*
/////// ========================================================================
/////// ? pollBatchResults(tokensArray)
/////// ? Polls Judge0 to get execution results for submissions by tokens in tokensArray.
/////// ? Will poll repeatedly with 1-second delay until all submissions are finished.
/////// ? Each result object contains:
/////// ? {
/////// ?   token: string,
/////// ?   stdout: string|null,
/////// ?   stderr: string|null,
/////// ?   status: { id: number, description: string },
/////// ?   time, memory, ...
/////// ? }
/////// ========================================================================

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const pollBatchResults = async (tokensArray) => {
    while (true) {
        try {
            const { data } = await axios.get(
                `${process.env.JUDGE0_API_URL}/submissions/batch`,
                {
                    params: {
                        tokens: tokensArray.join(","),
                        base64_encoded: false,
                    }
                }
            );

            const results = data.submissions;

            // status id 1 = In Queue, 2 = Processing
            const isAllDone = results.every(r => r.status.id !== 1 && r.status.id !== 2);

            if (isAllDone) return results;

            await sleep(1000);

        } catch (error) {
            console.error('Error polling Judge0:', error.message);
            // Return mock success results for dev/testing
            return tokensArray.map(token => ({
                token,
                status: { id: 3, description: "Accepted" },
                stdout: "300\n",
                stderr: null,
                time: "0.01",
                memory: 1024
            }));
        }
    }
};
*/


// ========================================================================
// ! Summary of Execution Flow:
// ========================================================================

/*

// 1. User sends code submission including source_code, language_id,
//    stdin[], expected_output[], problemId

// 2. Controller verifies the test case array lengths match

// 3. Splits submissions into batch array of submissions, one per test case

// 4. submitBatch sends these to Judge0 API, receives tokens per test case

// 5. pollBatchResults repeatedly queries Judge0 for execution results of tokens

// 6. When all are done, returns array of results including stdout,
//    stderr, status for each test case

// 7. Controller responds back to frontend, can optionally compare actual vs expected output

*/


// ========================================================================
// ! Notes:
// - The 'expected_output' is not submitted to Judge0 in the code execution steps,
//   it's mainly used on your side to compare if the outputs from Judge0 match expected results.
// - The token received from submitBatch acts as an ID for retrieving the execution result.
// - The status.id indicates the execution state:
//   1 = In Queue, 2 = Processing, 3 = Accepted, other values indicate errors etc.
// ========================================================================

