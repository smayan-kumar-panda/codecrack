# TechStack we are using-->
- React
- Zustand
- Tailwindcss
- DaisyUI
- Vite
- Zod
- react-hook-form

# steps of setup-->
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

//--------------------------------------------------------------------------------------
26. After this, install zustand
27. "npm i axios zustand"
28. create a new folder in src called store and another folder lib
29. create "axios.js" in lib and write axios.create there to create a global axios url access
30. inside the store folder create "useAuthStore.js" use zustand there.
31. beside the "checkAuth" method in zustand every other method used "Toast" which can be installed as "npm i react-hot-toast" , after this go to app.jsx and use <Toaster/>
32. What is Toaster? --> basically used to show a popup message(during login , signup etc) used just like "alert" in vanilla js
33. now import "toast" from react-hot-toast in useAuthStore.js
34. after completing zustand go to app.jsx
