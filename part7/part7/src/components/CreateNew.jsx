import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('text')
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/', { state: { message: `A new anecdote "${content.value}" has been created!` } })
    }

    const resetForm = (fields) => {
      fields.forEach(field => field.reset())
    }
  
    return (
      <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
        content
        <input name='content' {...content} />
        </div>
        <div>
        author
        <input name='author' {...author} />
        </div>
        <div>
        url for more info
        <input name='info' {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => resetForm([resetContent, resetAuthor, resetInfo])}>reset</button>
      </form>
      </div>
    )
  
  }

export default CreateNew