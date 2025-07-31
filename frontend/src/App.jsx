import {Routes,Route,Navigate} from "react-router-dom"
import {Toaster} from "react-hot-toast"

import HomePage from "./page/HomePage.jsx"
import LoginPage from "./page/LoginPage.jsx"
import SignupPage from "./page/SignupPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"


function App(){
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
  
  return (
    // this is known as react fragmet the most upperlevel wrap for the react app "<>"
    <div className="flex flex-col items-center justify-start">
      <Toaster/>  
      <Routes>

        <Route 
        path="/login"
        element={ !authUser? <LoginPage/> : <Navigate to={"/"}/> }
        />

        <Route
        path="/signup"
        element={!authUser? <SignupPage/> : <Navigate to={"/"}/> }
        />

        <Route
        path="/"
        element={ authUser? <HomePage/> : <Navigate to={"/login"}/> }
        />

      </Routes>
    </div>
  )
}

export default App