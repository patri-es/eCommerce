import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from '../../../src/Frontend/src/components/Navbar.jsx'

describe('Navbar', () => {
    it('renders the main navigation links for desktop and mobile', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        expect(screen.getAllByRole('link', { name: 'Home' })).toHaveLength(2)
        expect(screen.getAllByRole('link', { name: 'Product' })[0]).toHaveAttribute('href', '/product')
        expect(screen.getAllByRole('link', { name: 'Category' })[0]).toHaveAttribute('href', '/category')
    })

    it('opens and closes the mobile menu while updating aria-expanded', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        const menuButton = screen.getByRole('button', { name: 'Open main menu' })

        expect(menuButton).toHaveAttribute('aria-expanded', 'false')

        fireEvent.click(menuButton)
        expect(menuButton).toHaveAttribute('aria-expanded', 'true')

        fireEvent.click(menuButton)
        expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
})
