const BlogForm = ({ blog, setBlog, handleSubmit }) => {
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                { Object.keys(blog).map(key => (
                    <div key={ key }>
                        { key }:
                        <input
                            type="text"
                            value={ blog[key] }
                            name={ key }
                            onChange={({ target }) => setBlog({ ...blog, [key]: target.value })}
                        />
                    </div>
                ))}
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}

export default BlogForm