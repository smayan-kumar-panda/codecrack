import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast"


// stores auth of users
export const useAuthStore=create((set)=>({
    // variables that we need

    authUser:null,    // similar to the output in postman, gives the result, initially set to null 
    isSignUp:false,   // set true while signing in user
    isLogIn:false,    // set true while logging in user
    isCheckingAuth:false,  // set true while checking auth of user

    // methods

    checkAuth:async()=>{
        // this calls the check route from backend which shows the user profile when logged in
        set({isCheckingAuth:true}) // beacuse the user is checking the profile
        try{
            // calls the backend url
            const res=await axiosInstance.get("/auth/check")  // we are calling get request because "/check" route in backend is a get req
            console.log("checkauth response",res.data);
            set({authUser:res.data.user})  // because in backend we used "req.user" to fetch the user data so here also we will call ".user"

        }
        catch(error){
            console.log("❌ error checking auth", error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    // this signup method is used in SignupPage.jsx check out
    // this method takes the "data" after successfull form submission
    signup:async(data)=>{
        set({isSignUp:true})
        try{
            const res=await axiosInstance.post("/auth/register",data)
            console.log("signup successfull",res.data);
            set({authUser:res.data.user})  // since the backend signup route uses "isLoggedIn" which sets req.user=user so we can access ".user" here same for login 
            toast.success(res.data.message)  // shows the message we used in res.json
        }
        catch(error){
            console.error("Error signing up",error)
            toast.error("error signing up",error)
        }
        finally{
            set({isSignUp:false})
        }
    },

    login:async(data)=>{
        set({isLogIn:true})
        try{
            const res=await axiosInstance.post("/auth/login",data)
            set({authUser:res.data.user})  // this res comes from the variable name 1 line above "res"
            toast.success(res.data.message)
        }
        catch(error){
            console.error("error loging in user",error)
            toast.error("error signing in",error)
        }
        finally{
            set({isLogIn:false})
        }
    },

    logout:async()=>{
        try{
            const res=await axiosInstance.post("auth/logout")
            set({authUser:null})
            toast.success("logout successfull")
        }
        catch(error){
            console.error("error logging out",error)
            toast.error("error logging out")
        }
    }

}))