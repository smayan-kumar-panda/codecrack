// ---------------------
// IMPORTS
// ---------------------
// React Router components for defining SPA routes and navigation
import { Routes, Route, Navigate } from "react-router-dom";
// Toast notifications popup component
import { Toaster } from "react-hot-toast";

// Importing app view components for routing targets
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import SignupPage from "./page/SignupPage.jsx";

// Zustand store hook for managing auth state and actions
import { useAuthStore } from "./store/useAuthStore.js";
// React hook to perform side effects (e.g., initial auth check)
import { useEffect } from "react";
// Loader spinner icon from lucide-react icon library for visual loading indicator
import { Loader2 } from "lucide-react";


// ---------------------
// MAIN APP COMPONENT
// ---------------------
function App() {

  // ---------------------
  // AUTH STORE STATE & ACTIONS
  // ---------------------
  // Destructuring from Zustand auth store:
  // - authUser: Authenticated user object (null if no user logged in)
  // - checkAuth: Function to verify current user authentication status(in zustand file)
  // - isCheckingAuth: Boolean flag indicating if auth is being checked currently(in zustand file)
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // ---------------------
  // SIDE EFFECT: RUN AUTH CHECK ON COMPONENT MOUNT
  // ---------------------
  useEffect(() => {
    // Run checkAuth once on component mount (to verify auth/session with backend)
    checkAuth();
  }, [checkAuth]); // Dependency array listens for checkAuth function reference change, usually stable

  /**Fires checkAuth() once on mount (or if the function reference changes—rare if Zustand is set up right).

   //* This ensures the app always checks if the user is still authenticated when loaded/refreshed. */



  // ---------------------
  // CONDITIONAL LOADER WHILE AUTH STATUS IS BEING VERIFIED
  // ---------------------
  if (!authUser && isCheckingAuth) {
    // Show spinner centered on screen to indicate loading state
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  // ---------------------
  // MAIN RETURN: RENDER ROUTES BASED ON AUTH STATE
  // ---------------------
  return (
    // Container div with flex column for vertical layout
    <div className="flex flex-col items-center justify-start">
      {/* Toast notification container - enables toast popups */}
      <Toaster />

      {/* Route definitions wrapped in React Router `Routes` component */}
      <Routes>

        {/*
          Route: "/login"
          - If user is not authenticated, show LoginPage
          - If already logged in, redirect to home "/"
        */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/*
          Route: "/signup"
          - If user is not authenticated, show SignupPage
          - If already logged in, redirect to home "/"
        */}
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />

        {/*
          Route: "/"
          - If user is authenticated, show HomePage (protected route)
          - Otherwise, redirect to login page "/login"
        */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

      </Routes>
    </div>
  );
}

// Export the App component as default export for use in main.jsx or entry point
export default App;
