# TechStack we are using-->
- React
- Zustand
- Tailwindcss
- DaisyUI
- Vite
- Zod
- react-hook-form

# steps of setup-->
------------------------

1. npm create vite@latest
2. Then select "./" as project name since we already created the folder
3. then select "React" and javascript
4. then do npm install
5. do "npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest" from "https://daisyui.com/docs/install/vite/"
6. then follow the steps from the link and inside "index.css" which is the main css file remove all existing css and add " @import "tailwindcss"; @plugin "daisyui"; "
7. Delete "App.css" and remove all the content from "App.jsx"
8. Create App.jsx from scratch
9. Install react-router-dom "npm i react-router-dom"
10. add "Browser router" in main.jsx
11. Then close the main.jsx (no more needed)
12. add import {Routes,Route,Navigate} from "react-router-dom" in app.jsx
13. create a new folder in source called "page" 
14. where all the pages are present of the application
15. After that install "npm i react-hook-form" (to build forms and use that forms in the application) and then import useForm from react-hook-form

----------------------------------------------------------------------------------------
16. Build the signup page
17. call "npm i @hookform/resolvers" and import "import {zodResolver} from "@hookform/resolvers/zod"" then call "npm i zod" (for validation)
18. " import {Link} from "react-router-dom" " then install " npm i lucide-react " (for calling the icons  in the application)
19. Start to build the left side of the application
20. After building the left side start the right side of the application
21. To build the right side of the app use "<AuthImagePattern/>"
22. create a components folder in src
23. create a file called AuthImagePattern.jsx
24. this file creates the right side animation part in both login and signup page
25. Then create the login page UI in the same way just copy paste the signup code

---------------------------------------------------------------------------------------------
26. After this, install zustand
27. "npm i axios zustand"
28. create a new folder in src called store and another folder lib
29. create "axios.js" in lib and write axios.create there to create a global axios url access
30. inside the store folder create "useAuthStore.js" use zustand there.
31. beside the "checkAuth" method in zustand every other method used "Toast" which can be installed as "npm i react-hot-toast" , after this go to app.jsx and use <Toaster/>
32. What is Toaster? --> basically used to show a popup message(during login , signup etc) used just like "alert" in vanilla js
33. now import "toast" from react-hot-toast in useAuthStore.js
34. after completing zustand go to app.jsx
35. call "authuser, isCheckingAuth, checkauth" from useauthStore.js in app.jsx
36. similarly call isSignup and signup function from zustand to signUpPage.jsx
37. same for the login page
38. change the button , make the button diabled when isSignup and isLogin time, show a loading animation 
when we they are true otherwise show Signup and login respectively
39. we will get a cors error now to solve this we go to backend
40. to check the cors error go to inspect and then network tab in the frontend
41. after solving the cors issue the backend-frontend auth connection is completed.

---------------------------------------------------------------------------------------
42. now we can design and build the homepage of the application.
43. go to app.jsx and change something
44. put the "Homepage.jsx" in the <Layout/> route
45. Then create a layout folder and inside the layout folder create Layout.jsx and then use it in the route as a wrapper above the homepage
46. WHY WE NEED LAYOUT PAGE?- becuase we have to have navigation and footer on everypage this will become a common layout for everypage.
47. Next, go into the newly created layout.jsx file
48. call outlet from react-router-dom
49. create a navbar component and add the ui components in it
50. after adding the ui components then add the Logout button in components this button when wrapped around something give it the power to logout and addd it to the navbar
51. after adding the logout button in the navbar then add the navbar in the layout
52. Now the admins can add problem
53. we have to create an admin route, go to app.jsx and create a new route
called adminroute and inside that admin route create a route for add-problem
54. create a AdminRoute.jsx in components directory
55. create a Addproblem.jsx file in page directory
56. in the addproblem create another component called CreateProblemForm.jsx in components
57. go into CreateProblemForm.jsx and import
import React from 'react'
import {useForm,useFieldArray,Controller} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from "zod"
import {
    Plus,
    Trash2,
    Code2,
    FileText,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Download,
} from "lucide-react"
import Editor from "@monaco-editor/react"
import { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import {Navigate,useNavigate} from "react-router-dom"

58. after this we will install monaco editor because when submitting the question too we have to give the code "npm i @monaco-editor/react" it provides a vs code like editor ide
59. " npm i monaco-editor"
60. 