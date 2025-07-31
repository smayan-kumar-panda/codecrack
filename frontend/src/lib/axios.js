import axios from "axios"


//Set a base URL to simplify requests:
// create functions does that sets a global url from which everything can be accessed after that 
// url by putting "/"

//* this is connect to the BACKEND OF THE APPLICATION

export const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE==="development" ? "http://localhost:3000/api/v1":"/api/v1",
    withCredentials:true,
})

