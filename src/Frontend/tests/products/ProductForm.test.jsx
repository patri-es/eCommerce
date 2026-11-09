import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import ProductForm from '../../src/components/product/ProductForm.jsx'

function ProductFormHarness({ onSubmit = vi.fn() }) {
    const methods = useForm({ defaultValues: { id: 0, name: '', description: '', imageUrl: '', price: '' } })

    return (
        <ProductForm
            methods={methods}
            onFormReset={vi.fn()}
            onFormSubmit={onSubmit}
            isEditing={false}
        />
    )
}

describe('ProductForm', () => {
    it('shows required-field validation and does not submit an invalid form', async () => {
        const onSubmit = vi.fn()
        render(<ProductFormHarness onSubmit={onSubmit} />)

        fireEvent.click(screen.getByTitle('Save product'))

        expect(await screen.findByText('name is required')).toBeInTheDocument()
        expect(screen.getByText('image URL is required')).toBeInTheDocument()
        expect(screen.getByText('price is required')).toBeInTheDocument()
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('submits the valid product values through the provided callback', async () => {
        const onSubmit = vi.fn()
        render(<ProductFormHarness onSubmit={onSubmit} />)

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Desk lamp' } })
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'LED lamp' } })
        fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.test/lamp.png' } })
        fireEvent.change(screen.getByLabelText('Price'), { target: { value: '24.50' } })
        fireEvent.click(screen.getByTitle('Save product'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Desk lamp',
            description: 'LED lamp',
            imageUrl: 'https://example.test/lamp.png',
            price: '24.50'
        }), expect.anything()))
    })
})
