// ---------------------
// IMPORTS
// ---------------------

// Core React Router components for defining app routes/navigation
import { Routes, Route, Navigate } from "react-router-dom";
// Provides toast notification pop-ups for user feedback
import { Toaster } from "react-hot-toast";

// Components corresponding to app views (each is routed to by a URL)
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import SignupPage from "./page/SignupPage.jsx";
import Layout from "./layout/Layout.jsx";
// AdminRoute is a wrapper for admin-protected routes
import AdminRoute from "./components/AdminRoute.jsx";
// Component for admin to add new problems
import Addproblem from "./page/AddProblem.jsx";

// Custom Zustand store hook for authentication state and actions
import { useAuthStore } from "./store/useAuthStore.js";
// React hook to run effects like data fetching or initialization
import { useEffect } from "react";
// Spinner icon (animated loading wheel) from lucide-react for UX feedback
import { Loader2 } from "lucide-react";

// ---------------------
// MAIN APP COMPONENT
// ---------------------
function App() {

  // ---------------------
  // AUTH STORE STATE & ACTIONS
  // ---------------------
  // Destructure authentication state and logic from Zustand store:
  //   authUser: current user (or null if logged out)
  //   checkAuth: function to verify login state (checks session/tokens)
  //   isCheckingAuth: true during background auth verification
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // ---------------------
  // RUN AUTH CHECK ON INITIAL LOAD
  // ---------------------
  useEffect(() => {
    // Check authentication status when component mounts (or checkAuth changes)
    checkAuth();
  }, [checkAuth]);
  // Ensures user authentication is validated whenever the app loads/refreshed

  // ---------------------
  // CONDITIONAL LOADER: SHOW WHILE AUTH CHECKING
  // ---------------------
  if (!authUser && isCheckingAuth) {
    // While auth check is in progress and user isn't yet known, show centered spinner
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  // ---------------------
  // MAIN UI: APP ROUTES AND LAYOUT
  // ---------------------
  return (
    // Root container for overall app layout (flex column for vertical stacking)
    <div className="flex flex-col items-center justify-start">
      {/* Renders toast notifications at the top level of the app */}
      <Toaster />

      {/* Main app route definitions */}
      <Routes>
        {/* 
          /login route:
          - If not logged in, render LoginPage
          - If already logged in, redirect to home
        */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* 
          /signup route:
          - If not logged in, render SignupPage
          - If logged in, redirect to home
        */}
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />

        {/* 
          Homepage under main layout:
          - Renders HomePage for logged-in users
          - If not authenticated, redirect to login
        */}
        <Route path="/" element={<Layout/>}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
        </Route> 

        {/* 
          /add-problem route (admin protected):
          - Parent <AdminRoute> ensures only admins reach Addproblem
          - If not authenticated, redirect to home
        */}
        <Route element={<AdminRoute/>}>
          <Route
            path="/add-problem"
            element={authUser ? <Addproblem /> : <Navigate to="/" />}
          />
        </Route>

      </Routes>
    </div>
  );
}

// Export App component for use in app entry point
export default App;
