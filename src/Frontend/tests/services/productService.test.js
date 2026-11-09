import { beforeEach, describe, expect, it, vi } from "vitest"
import api from "../../src/services/api.js"
import {
    activateProduct,
    assignCategory,
    createProduct,
    deactivateProduct,
    decreaseStock,
    deleteProduct,
    getProduct,
    getProducts,
    increaseStock,
    removeCategory,
    updateProduct
} from "../../src/services/productService.js"

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

describe("productService", () => {
    it("gets products with filters", async () => {
        const filters = { categoryIds: [2], isAvailable: true }

        await getProducts(filters)

        expect(api.get).toHaveBeenCalledWith("/products", { params: filters })
    })

    it("gets products with empty filters by default", async () => {
        await getProducts()

        expect(api.get).toHaveBeenCalledWith("/products", { params: {} })
    })

    it("gets a product by id", async () => {
        await getProduct(12)

        expect(api.get).toHaveBeenCalledWith("/products/12")
    })

    it("creates a product with its payload", async () => {
        const product = { name: "Keyboard", price: 39.99 }

        await createProduct(product)

        expect(api.post).toHaveBeenCalledWith("/products", product)
    })

    it("updates a product with PATCH", async () => {
        const product = { name: "Keyboard Pro", price: 49.99 }

        await updateProduct(12, product)

        expect(api.patch).toHaveBeenCalledWith("/products/12", product)
    })

    it("deletes a product by id", async () => {
        await deleteProduct(12)

        expect(api.delete).toHaveBeenCalledWith("/products/12")
    })

    it("increases stock with a quantity payload", async () => {
        await increaseStock(12, 4)

        expect(api.post).toHaveBeenCalledWith("/products/12/stock/increase", { quantity: 4 })
    })

    it("decreases stock with a quantity payload", async () => {
        await decreaseStock(12, 3)

        expect(api.post).toHaveBeenCalledWith("/products/12/stock/decrease", { quantity: 3 })
    })

    it("activates and deactivates products", async () => {
        await activateProduct(12)
        await deactivateProduct(13)

        expect(api.post).toHaveBeenNthCalledWith(1, "/products/12/activate")
        expect(api.post).toHaveBeenNthCalledWith(2, "/products/13/deactivate")
    })

    it("assigns and removes a product category", async () => {
        await assignCategory(12, 5)
        await removeCategory(12, 5)

        expect(api.post).toHaveBeenCalledWith("/products/12/categories/5")
        expect(api.delete).toHaveBeenCalledWith("/products/12/categories/5")
    })
})
