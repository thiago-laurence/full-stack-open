import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

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
      setErrorMessage({ text: exception.response.data.error, ok: false })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('logged-user')
    setUser(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setBlog({ title: '', author: '', url: '' })
      setErrorMessage({ text: 'a new blog is added', ok: true })
    } catch (exception) {
      setErrorMessage({ text: exception.response.error, ok: false })
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Message message={ errorMessage } />
      { (user === null) ?
          <LoginForm handleLogin={ handleLogin } username={ username } password={ password } setUsername={ setUsername } setPassword={ setPassword } />
        :
          <div>
            <h2>blogs</h2>
            <p>{ user.name } logged-in </p> <button onClick={ handleLogout }>logout</button>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
            <BlogForm blog={ blog } setBlog={ setBlog } handleSubmit={ handleSubmit } />
          </div>
      }
    </div>
  )
}

export default App