// Axios instance - This file centralizes communication between the frontend and the API.
import axios from "axios"

let csrfToken = null

export const setCsrfToken = (token) => {
    csrfToken = token
}

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
        const method = config.method?.toUpperCase()

        const unsafeMethods = ["POST", "PUT", "PATCH", "DELETE"]

        if (unsafeMethods.includes(method) && csrfToken) {
            config.headers["X-CSRF-TOKEN"] = csrfToken
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export default api