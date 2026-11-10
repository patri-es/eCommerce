import { describe, expect, it } from "vitest"
import { getErrorMessage } from "../../src/utils/errorHelper.js"

describe("getErrorMessage", () => {
    it("returns the ProblemDetails detail", () => {
        expect(getErrorMessage({
            response: {
                data: {
                    detail: "Product not found"
                }
            }
        })).toBe("Product not found")
    })

    it("flattens ValidationProblemDetails errors", () => {
        expect(getErrorMessage({
            response: {
                data: {
                    errors: {
                        Name: ["Name is required"],
                        Price: ["Price must be positive", "Price is too high"]
                    }
                }
            }
        })).toBe("Name is required Price must be positive Price is too high")
    })

    it("prefers ProblemDetails detail when details and validation errors exist", () => {
        expect(getErrorMessage({
            response: {
                data: {
                    detail: "Invalid request",
                    errors: {
                        Name: ["Name is required"]
                    }
                }
            }
        })).toBe("Invalid request")
    })

    it("returns the JavaScript error message", () => {
        expect(getErrorMessage({ message: "Network Error" })).toBe("Network Error")
    })

    it("uses the provided or default fallback message", () => {
        expect(getErrorMessage({}, "Unable to load data")).toBe("Unable to load data")
        expect(getErrorMessage({})).toBe("An unexpected error occurred.")
    })
})
