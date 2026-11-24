
import api, { setCsrfToken } from "./api"

// Token CSRF (Cross-Site Request Forgery) comunication
const authenticationService = {
    async refreshToken() {
        const response = await api.get("/antiforgery/token")

        const token = response.data.token

        setCsrfToken(token)

        return token
    },

    clearToken() {
        setCsrfToken(null)
    }
}

export default authenticationService
