import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
    let container
    const user = {
        name: 'Test User',
        username: 'testuser'
    }
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.url',
        likes: 0
    }
    const mockUpdateHandler = vi.fn()
    const mockRemoveHandler = vi.fn()

    beforeEach(() => {
        container = render(
            <Blog user={ user } blog={ blog } update={ mockUpdateHandler } remove={ mockRemoveHandler } />
        ).container
    })

    test('renders blogs title and author, but dont url and likes by default', async () => {
        const p = container.querySelector('.blog-title-author')
        expect(p).toHaveTextContent(`"${blog.title}" by ${blog.author}`)

        const togglable = container.querySelector('.togglableContent')
        expect(togglable).toHaveStyle('display: none')
    })

    test('renders url and likes after clicking the view button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const p = container.querySelector('.togglableContent')
        expect(p).not.toHaveStyle('display: none')
    })

    test('click in like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockUpdateHandler.mock.calls).toHaveLength(2)
    })
})