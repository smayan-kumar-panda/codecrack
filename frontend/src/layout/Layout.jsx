import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar.jsx"

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>  {/** acts as a placeholder for other components to render */}
      {/* here the navbar will appear in every page of the "/" path thats why 
      we called the <Layout/> element instead of calling the <Homepage/> directly */}
    </div>
  )
}

export default Layout

//---------------------------------------------------------------------------------
//! Notes on Outlet
/**
 * The <Outlet /> component in React Router serves as a placeholder inside a parent route's 
 * component where the matched child route components will be rendered dynamically. 
 * It allows nested routing by telling React Router exactly where in the parent layout 
 * the child routes' content should appear.

More specifically:

When a route has child routes, the parent's component renders the layout that is common 
for all those child routes (like a navbar or sidebar).

The <Outlet /> component positioned inside the parent's JSX marks the spot where the 
child route components matching the current URL will be injected.

If there is no matched child route, <Outlet /> renders nothing (null).

This mechanism enables sharing layouts across different routes and dynamically 
rendering nested views without reloading the page.

For example, if you have a dashboard layout with nested profile and settings pages, 
<Outlet /> in the dashboard component will render either the profile or settings component depending on the route.

In short, <Outlet /> is essential for building nested or hierarchical routes in 
React Router, helping you organize route-based layouts efficiently within single-page 
applications
 */
