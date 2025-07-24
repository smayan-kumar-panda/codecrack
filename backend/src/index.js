import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// importing from routes
import authRouter from "./routes/auth.route.js"
import problemRouter from "./routes/problemRoute.route.js"
import executionRouter from "./routes/execute-code.route.js"
import submissionRouter from "./routes/submission.route.js"
import playlistRouter from "./routes/playlist.route.js"
import { exec } from "child_process"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/problem",problemRouter)
app.use("/api/v1/execute-code",executionRouter)
app.use("/api/v1/submission",submissionRouter)
app.use("/api/v1/playlist",playlistRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT = ${process.env.PORT}`)
})

//-------------------------------------------------------------------------------------------
 //? do the basic setup (install express,nodemon etc) then setup 
 //TODO    prisma-postgres-docker db

//! USED NEON IN THIS PROJECT SINCE DOCKER DIDNT WORK
//? can use neon to create a postgres database
//? just get the neon db url and add it in .env
//? approach the prisma ans before
//? npm i prisma @prisma/client
//? npx prisma init (create the prisma file and add models in that)
//? npx prisma generate
//?npx prisma migrate dev
//? npx prisma db push(for any changes in db and pushing it to db)
//? 


 //! PRISMA SETUP-->
 //? "npm i prisma"
 //? "npm i @prisma/client"
 //? "npx prisma init" --> to initialise a prisma file
 //prisma will help us to work with postgres sql db just like mongoose helps mongodb
 //? we are using postgres database

 //! DOCKER SETUP-->(to install postgres)
 //? open and run docker desktop
 //? go to images and search for postgres and install(1 way of doing)
 //? (2nd way) in the terminal type "docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres"
 //? this command runs docker postgres container locally in the system in detached mode
 //? added the db url in .env "postgresql://postgres:postgres@localhost:5432/postgres"


 //! PRISMA CLIENT SETUP IN DB.JS
 //! seting up schema.prisma
 //? create "model User" in schema.prisma then go to db.js 
 //? run "npx prisma generate" to create a generate folder
 //? now inside db.js and import "import {PrismaClient} from "../generated/prisma/index.js""
 //* after setting up db.js run "npx prisma migrate dev" this command setsup the db schema that we wrote in schema.prisma to use them (in CRUD operations)
 //* then do "npx prisma db push" to push any changes in the db

//----------------------------------------------------------------------------------------
//! after setting up db 
//TODO   ---> first we setup authetication

//? to generate a random jwt secret which is strong just open terminal go to dropdown open "gitbash"
//? thentype "openssl rand -hex 32" this will generate a 32 bit gibberish string which is random
//? can be used as jwt secret