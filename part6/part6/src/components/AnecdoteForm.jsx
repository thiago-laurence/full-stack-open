import { useState } from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = anecdote
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`You created '${ newAnecdote }'`, 5000))
        setAnecdote('')
    }

    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={ addAnecdote }>
                <div>
                    <input value={ anecdote } onChange={({ target }) => setAnecdote(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default AnecdoteForm