// * React library - compulsory to define React components
import React, { useState } from 'react' 
// Example: useState allows tracking state inside a function component, e.g. [count, setCount] = useState(0)
// Return: A function component (JSX output), plus local state mechanic for toggling values

// * useForm - Main hook from React Hook Form library for managing form state/validation
import { useForm } from "react-hook-form" 
// Example: const { register, handleSubmit, formState: { errors } } = useForm();
// Return: An object with helpers to connect inputs, submit forms, and access errors[7]

// * zodResolver - Adapter to connect zod schemas with react-hook-form validation
import { zodResolver } from "@hookform/resolvers/zod" 
// Example: useForm({ resolver: zodResolver(schema) });
// Return: Custom validation logic is injected; invalid inputs will automatically trigger errors

// * Link - SPA navigation, like <a> tag but keeps page from reloading (uses React Router)
import { Link } from "react-router-dom" 
// Example: <Link to="/about">About</Link> navigates to "/about" without reload

// * Icon components, for better visual cues on the UI, imported from lucide-react library
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react" 
// Example: <EyeOff /> renders an "eye-off" SVG icon

// * A custom-made component (draws/animates a pattern or illustration for authentication pages)
import AuthImagePattern from '../components/AuthImagePattern' 
// Example: <AuthImagePattern title="..." subtitle="..." />
// Return: JSX for eye-catching side-image (functional only as a visual component)

// * zod validation library for robust, schema-driven runtime value validation
import { z } from "zod" 
// Example: z.string().email().min(3)
// Return: Zod schema object with validation logic

// -----------------------------------------------------------

// * signupSchema - Defines validation rules for the signup form (with zod)
// Return: A schema object. Used to enforce structure and rules for form data
const signupSchema = z.object({
  email: z.string().email("enter a valid email"), // Only valid email allowed (e.g., "abc@xyz.com")
  password: z.string().min(6, "Password should be atleast 6 characters"), // Length >= 6
  name: z.string().min(3, "Name must be atlest 3 characters") // Length >= 3
})
// Usage Example: signupSchema.parse({ email: "bad", password: "123", name: "xy" })
// Return: Throws error since all fail, otherwise returns sanitized object

// -----------------------------------------------------------

// * Main signup page functional component
const SignUpPage = () => {

  // * Local state to toggle password visibility
  // * showPassword: boolean (default: false)
  //      - false: Password is hidden (dots), true: plain text
  // Example: Click show/hide button; sets showPassword true/false
  // Return: [showPassword, setShowPassword], like [false, fn]
  const [showPassword, setShowPassword] = useState(false);

  // * useForm hook initializes form logic with zod schema validation
  //    - register: connects <input> fields to form state
  //    - handleSubmit: processes form submission and runs validation
  //    - formState.errors: validation errors object for each field
  // Return: { register: fn, handleSubmit: fn, formState: { errors: {} } }
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema) // This signals to use zod-based validation
  })

  // * Function called after successful form validation on submit
  //    - data: { name: string, email: string, password: string }
  //    - Attempts "signup" (assumed async function, not shown)
  //    - If signup fails -> logs error
  // Return: Nothing (side-effect: logs, external call)
  const onSubmit = async (data) => {
    try {
      // this signup is present in useAuthStore.js
      await signup(data) // Example: signup({name: "John", email: "john@mail.com", password: "secretpw"})
      console.log("signup data", data)
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  }

  // -----------------------------------------------------------

  // * Render the signup page UI
  // Return: JSX (virtual elements to be displayed in the app)
  return (
    <div className='h-screen grid lg:grid-cols-2'>
      {/* -------------- Left Side: Form Section -------------- */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 max-w-full">
        <div className="w-full max-w-md space-y-8">
          
          {/* ---------- Logo & Heading ----------- */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Code className="w-10 h-10 text-primary " /> 
                
              </div>
              <h1 className="text-4xl font-bold mt-2 text-lime-600 hover:text-primary">
                Welcome to CodeCrack
                
              </h1>
              <p className="text-lime-600 hover:text-primary from-stone-400 font-medium">
                Create your account
      
              </p>
            </div>
          </div>

          {/* -------------- Signup Form --------------- */}
          {/* handleSubmit wraps onSubmit so that if validation fails, onSubmit is NOT called */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ---------- Name Field ---------- */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium text-lime-700">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Code className="h-5 w-5 text-base-content/40" />
                  
                </div>
                <input
                  type="text"
                  {...register("name")}
                  className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""}`}
                  placeholder="John Doe"
                  // Return: Name field, registered with form logic. Error class if validation fails
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                // Return: If name is < 3 chars, displays error text
              )}
            </div>

            {/* ---------- Email Field ---------- */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium text-lime-700">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                  
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""}`}
                  placeholder="you@example.com"
                  // Return: Email input, error class if not valid email
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                // Return: Shows "enter valid email" if not an email
              )}
            </div>

            {/* ---------- Password Field ---------- */}
            <div className="form-control ">
              <label className="label mb-1">
                <span className="label-text font-medium text-lime-700">Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                  
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                  // Return: Password input. Dots ("•••••") if hidden, text if showPassword = true
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  // Return: Toggles password between visible (text) and hidden (dots) modes
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" /> // Hide icon if shown
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" /> // Eye icon if hidden
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                // Return: If password < 6 chars, displays error
              )}
            </div>

            {/* --------- Submit Button ---------- */}
            <button
              type="submit"
              className="btn border-3 w-full btn-soft btn-success"
            >
              SignUp
              
            </button>
          </form>

          {/* --------- Footer: Link to Login --------- */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-hover link-primary text-lime-500">
                Log in
               
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Animation/Visual */}
      <AuthImagePattern
        title={"Solve and Execute Code with Ease"}
        subtitle={"Signup to access our platform and use our services"}
        // Return: Right half of the screen shows a welcome image/animation with subtitle
      />
    </div>
    // Entire return: Renders a 2-column grid. Left = form, right = illustration. Handles all signup logic and user feedback.
  )
}

// * Exports the component for router or parent use
export default SignUpPage
// Return: Lets other files use SignUpPage as <SignUpPage />
