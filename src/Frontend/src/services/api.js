// Axios instance
// This file centralizes communication between the frontend and the API.

import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    paramsSerializer: {
        indexes: null
    },
    timeout: 10000,
    withCredentials: true
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api