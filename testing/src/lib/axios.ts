import axios from "axios";


const token = process.env.jwtTOKEN ;

export const axiosInstance = axios.create({ 
    baseURL:"http://localhost:3001",
})
