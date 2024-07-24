import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
    let container
    const mockCreateHandler = vi.fn()

    beforeEach(() => {
        container = render(
            <BlogForm createBlog={ mockCreateHandler } />
        ).container
    })

    test('calls event handler with the right details when a new blog is created', async () => {
        const blog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://test.url',
        }
        const user = userEvent.setup()
        const titleInput = screen.getByTestId('form-title')
        const authorInput = screen.getByTestId('form-author')
        const urlInput = screen.getByTestId('form-url')
        const createButton = screen.getByText('Create')

        await user.type(titleInput, blog.title)
        await user.type(authorInput, blog.author)
        await user.type(urlInput, blog.url)
        await user.click(createButton)

        expect(mockCreateHandler.mock.calls).toHaveLength(1)
        expect(mockCreateHandler.mock.calls[0][0]).toStrictEqual({ title: blog.title, author: blog.author, url: blog.url })
    })
})