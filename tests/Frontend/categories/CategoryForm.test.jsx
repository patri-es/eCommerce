import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import CategoryForm from '../../../src/Frontend/src/components/categories/CategoryForm.jsx'

function CategoryFormHarness({ onSubmit = vi.fn() }) {
    const methods = useForm({ defaultValues: { id: 0, name: '', description: '', code: '' } })

    return (
        <CategoryForm
            methods={methods}
            onFormReset={vi.fn()}
            onFormSubmit={onSubmit}
        />
    )
}

describe('CategoryForm', () => {
    it('shows required-field validation and does not submit an invalid form', async () => {
        const onSubmit = vi.fn()
        const { container } = render(<CategoryFormHarness onSubmit={onSubmit} />)

        fireEvent.submit(container.querySelector('form'))

        expect(await screen.findByText('name is  required')).toBeInTheDocument()
        expect(screen.getByText('description is  required')).toBeInTheDocument()
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('shows the code length validation message when the maximum is exceeded', async () => {
        const { container } = render(<CategoryFormHarness />)
        fireEvent.change(screen.getByLabelText('Code'), { target: { value: 'x'.repeat(31) } })
        fireEvent.submit(container.querySelector('form'))

        expect(await screen.findByText('code can not exceed 30 characters')).toBeInTheDocument()
    })

    it('submits a valid category through the provided callback', async () => {
        const onSubmit = vi.fn()
        const { container } = render(<CategoryFormHarness onSubmit={onSubmit} />)

        fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'Stationery' } })
        fireEvent.change(screen.getByPlaceholderText('Enter last name'), { target: { value: 'Office supplies' } })
        fireEvent.change(screen.getByLabelText('Code'), { target: { value: 'OFFICE' } })
        fireEvent.submit(container.querySelector('form'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Stationery',
            description: 'Office supplies',
            code: 'OFFICE'
        }), expect.anything()))
    })
})
