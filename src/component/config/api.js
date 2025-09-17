import axios from "axios"

export const API_URL ="http://localhost:1129"

export const api = axios.create({ 
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
    }
})