import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

describe('Page', () => {
    it('Check Link', () => {
        render(<Page />)

        const heading = screen.getByRole('link', { name: 'レンダリング1' })
        expect(heading).toBeInTheDocument()
    })
})
