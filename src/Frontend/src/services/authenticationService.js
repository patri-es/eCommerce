
import api, { setCsrfToken } from "./api"

// Handles CSRF (Cross-Site Request Forgery) token management.
const authenticationService = {
    async refreshToken() {
        const response = await api.get("/antiforgery/token")

        const token = response.data.token

        setCsrfToken(token)

        return token
    },

    async login(credentials) {
        const response = await api.post("/authentication/login", credentials)

        // Refresh the token after the authentication state changes.
        await this.refreshToken()

        return response.data
    },

    clearToken() {
        setCsrfToken(null)
    }
}

export default authenticationService
