import React,{useState} from 'react'
import {useForm} from "react-hook-form"  // create forms
import {zodResolver} from "@hookform/resolvers/zod"  // for zod validation in the application
import {Link} from "react-router-dom"  
import {Code,Eye,EyeOff,Loader2,Lock,Mail} from "lucide-react"  // adds icons in the application
import AuthImagePattern from '../components/AuthImagePattern'
import {z} from "zod"  // for validation


//-----------------------------------------------------------------------------
// for signup we have to send the name , email and password
//* keep the backend up and running to send data

const loginSchema=z.object(
  {
    email:z.string().email("enter a valid email"),
    password:z.string().min(6,"Password should be atleast 6 characters"),

  }
)

const LoginPage = () => {

  const [showPassword , setShowPassword] = useState(false);

  

  //? the below code is coming from react-hook-form
  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({
    resolver:zodResolver(loginSchema)
  })

  const onSubmit = async (data)=>{
   try {
    await signup(data)
    console.log("signup data" , data)
   } catch (error) {
     console.error("SignUp failed:", error);
   }
  }


  return (
    <div className='h-screen grid lg:grid-cols-2'>

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">

        <div className="w-full max-w-md space-y-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Code className="w-10 h-10 text-primary " />
              </div>
              <h1 className="text-4xl font-bold mt-2 text-lime-600 hover:text-primary">Welcome back to CodeCrack</h1>
              <p className="text-lime-600 hover:text-primary from-stone-400 font-medium">Login to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-lime-600">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text font-medium text-lime-600">Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn border-3 w-full btn-soft btn-success"
            > 
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-hover link-primary text-lime-500">
                Signup
              </Link>
            </p>
          </div>

        </div>

      </div>

      <AuthImagePattern
      title={"Solve and Execute Code with Ease"}
      subtitle={"Login to access our platform and use our services"}
      />

    </div>
  )
}

export default LoginPage
