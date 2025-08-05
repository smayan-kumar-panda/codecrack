import React from 'react'                                   // Import React for JSX support.
import { Navigate, Outlet } from "react-router-dom"          // Import Navigate (for redirects) and Outlet (for nested routes) components from React Router.
import { useAuthStore } from '../store/useAuthStore'         // Import authentication state hook from Zustand store.
import { Loader } from 'lucide-react'


//* Define AdminRoute component that restricts access to admin-only routes.
const AdminRoute = () => {
    // Destructure auth state:
    // - authUser: Currently logged-in user object (null if not authenticated)
    // - isCheckingAuth: Whether authentication status is still being checked
    const { authUser, isCheckingAuth } = useAuthStore()

    // If authentication is being checked, show a loading spinner centered on the screen.
    if (isCheckingAuth) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className="size-10 animate-spin" /> // Loader spinner icon (needs to be imported!)
            </div>
        )
    }

    // If no user is logged in or user is not an admin,
    // redirect to home page ("/").
    if (!authUser || authUser.role !== "ADMIN") {
        return (
            <Navigate to="/" />
        )
    }

    // Otherwise, render the nested child route component at this Outlet position
    return <Outlet />
}


export default AdminRoute    // Export component for use in route protection.
