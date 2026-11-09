import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProductCatalog from '../../src/components/product/ProductCatalog.jsx'
import ProductFilters from '../../src/components/product/ProductFilters.jsx'
import ProductGrid from '../../src/components/product/ProductGrid.jsx'

const { getProducts, getCategories } = vi.hoisted(() => ({
    getProducts: vi.fn(),
    getCategories: vi.fn()
}))

vi.mock('../../src/services/productService.js', () => ({ getProducts }))
vi.mock('../../src/services/categoryService.js', () => ({ getCategories }))
vi.mock('react-hot-toast', () => ({ default: { error: vi.fn() } }))

function CatalogView() {
    return (
        <ProductCatalog>
            {({ products, categories, filters, onFiltersChange, sortPrice, onSortPriceChange, loading }) => (
                <>
                    <ProductFilters
                        categories={categories}
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                        sortPrice={sortPrice}
                        onSortPriceChange={onSortPriceChange}
                    />
                    <ProductGrid products={products} loading={loading} />
                </>
            )}
        </ProductCatalog>
    )
}

describe('ProductCatalog and ProductFilters', () => {
    beforeEach(() => {
        getProducts.mockReset()
        getCategories.mockReset()
        getCategories.mockResolvedValue({ data: [{ id: 2, name: 'Books' }] })
        getProducts.mockResolvedValue({ data: [] })
    })

    it('shows loading and then the empty catalog state', async () => {
        let resolveProducts
        getProducts.mockReturnValueOnce(new Promise(resolve => { resolveProducts = resolve }))

        render(<CatalogView />)

        expect(screen.getByText('Cargando productos...')).toBeInTheDocument()

        resolveProducts({ data: [] })
        expect(await screen.findByText('No hay productos para mostrar.')).toBeInTheDocument()
    })

    it('sends selected category and availability/stock filters to the product service', async () => {
        render(<CatalogView />)
        await screen.findByRole('option', { name: 'Books' })

        fireEvent.change(screen.getByLabelText('Categorías'), { target: { value: '2' } })
        fireEvent.click(screen.getByRole('checkbox', { name: /Solo disponibles/ }))
        fireEvent.click(screen.getByRole('checkbox', { name: /Solo con stock/ }))

        await waitFor(() => {
            expect(getProducts).toHaveBeenLastCalledWith({
                CategoryIds: [2],
                IsAvailable: true,
                MinStock: 1
            })
        })
    })

    it('sorts the displayed products by price without changing the source order', async () => {
        getProducts.mockResolvedValue({
            data: [
                { id: 1, name: 'Expensive item', price: 20 },
                { id: 2, name: 'Affordable item', price: 5 }
            ]
        })

        render(<CatalogView />)
        await screen.findByText('Expensive item')
        fireEvent.change(screen.getByLabelText('Ordenar por precio'), { target: { value: 'asc' } })

        await waitFor(() => {
            const displayedItems = screen.getByText('Affordable item').closest('div.grid').querySelectorAll('h2')
            expect(Array.from(displayedItems, item => item.textContent)).toEqual(['Affordable item', 'Expensive item'])
        })
    })
})
