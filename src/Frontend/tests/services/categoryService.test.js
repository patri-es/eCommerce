import { beforeEach, describe, expect, it, vi } from "vitest"
import api from "../../src/services/api.js"
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory
} from "../../src/services/categoryService.js"

const apiMocks = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
}))

vi.mock("../../src/services/api.js", () => ({
    default: apiMocks
}))

beforeEach(() => {
    vi.clearAllMocks()
})

describe("categoryService", () => {
    it("gets all categories", async () => {
        await getCategories()

        expect(api.get).toHaveBeenCalledWith("/categories")
    })

    it("gets a category by id", async () => {
        await getCategory(7)

        expect(api.get).toHaveBeenCalledWith("/categories/7")
    })

    it("creates a category with its payload", async () => {
        const category = { name: "Accessories", code: "ACC" }

        await createCategory(category)

        expect(api.post).toHaveBeenCalledWith("/categories", category)
    })

    it("updates a category with PUT", async () => {
        const category = { name: "Accessories", code: "ACC" }

        await updateCategory(7, category)

        expect(api.put).toHaveBeenCalledWith("/categories/7", category)
    })

    it("deletes a category by id", async () => {
        await deleteCategory(7)

        expect(api.delete).toHaveBeenCalledWith("/categories/7")
    })
})
