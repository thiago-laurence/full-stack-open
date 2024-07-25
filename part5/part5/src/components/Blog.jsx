import Togglable from './Togglable'

const Blog = ({ user, blog, update, remove }) => (
    <div className="blog" style={ { border: '2.5px solid black', fontSize: '20px', padding: '10px', margin: '10px 0px' } }>
        <p style={ { margin: '0px' } } className='blog-title-author'>
            { '"' + blog.title + '"' } by { blog.author }
        </p>
        <Togglable buttonShowLabel="View" buttonHideLabel="Hide">
            <p>{ blog.url }</p>
            <p data-testid='blog-like'>{ blog.likes } likes <button onClick={() => update(blog) }>Like</button></p>
            { (blog.user)
                ? <div>
                    <p>{ blog.user.name + ' \'' + blog.user.username + '\'' }</p>
                    { (blog.user.username === user.username)
                        ? <button onClick={ () => remove(blog) }>Remove</button>
                        : null
                    }
                </div>
                : <p>{ '"Anonymous"' }</p>
            }
        </Togglable>
    </div>
)

export default Blog