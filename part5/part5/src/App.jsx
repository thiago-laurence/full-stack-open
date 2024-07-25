import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('logged-user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('logged-user', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotification({ text: exception.response.data.error, ok: false })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('logged-user')
        setUser(null)
    }

    const addBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            const newBlog = await blogService.create(blog)
            setBlogs(blogs.concat(newBlog))
            setNotification({ text: 'a new blog is added', ok: true })
        } catch (exception) {
            setNotification({ text: exception.response.error, ok: false })
        }
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const likeBlog = async (blog) => {
        try{
            const newBlog = { ...blog, likes: blog.likes + 1 }
            const updatedBlog = await blogService.update(blog.id, newBlog)
            setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
            setNotification({ text: 'like added', ok: true })
        }catch(exception){
            setNotification({ text: exception.response.error, ok: false })
        }
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const deleteBlog = async (blog) => {
        if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)){
            try{
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
                setNotification({ text: 'blog removed', ok: true })
            }catch(exception){
                setNotification({ text: exception.response.error, ok: false })
            }
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    return (
        <div>
            <Notification message={ notification } />
            { (user === null) ?
                <LoginForm handleLogin={ handleLogin } username={ username } password={ password } setUsername={ setUsername } setPassword={ setPassword } />
                :
                <div>
                    <h2>Blogs</h2>
                    <p>{ user.name } logged-in </p> <button onClick={ handleLogout }>Logout</button>

                    { blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                        <Blog key={blog.id} user={ user } blog={blog} update={ likeBlog } remove={ deleteBlog } />)
                    }

                    <Togglable buttonShowLabel="Create new blog" buttonHideLabel="Cancel" ref={ blogFormRef }>
                        <BlogForm createBlog={ addBlog } />
                    </Togglable>
                </div>
            }
        </div>
    )
}

export default App