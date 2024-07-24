import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [blog, setBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blog.title,
            author: blog.author,
            url: blog.url
        })

        setBlog({ title: '', author: '', url: '' })
    }

    return (
        <form onSubmit={ addBlog }>
            <div>
                { Object.keys(blog).map(key => (
                    <div key={ key }>
                        { key }:
                        <input
                            type="text"
                            value={ blog[key] }
                            name={ key }
                            data-testid={ 'form-' + key }
                            onChange={({ target }) => setBlog({ ...blog, [key]: target.value })}
                        />
                    </div>
                ))}
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

export default BlogForm