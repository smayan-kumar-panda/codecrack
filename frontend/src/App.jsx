import {Routes,Route,Navigate} from "react-router-dom"
import HomePage from "./page/HomePage.jsx"
import LoginPage from "./page/LoginPage.jsx"
import SignupPage from "./page/SignupPage.jsx"

function App(){

  let authUser=null  // related to user authetication (checking if user is authenticated)

  return (
    // this is known as react fragmet the most upperlevel wrap for the react app "<>"
    <div className="flex flex-col items-center justify-start">
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