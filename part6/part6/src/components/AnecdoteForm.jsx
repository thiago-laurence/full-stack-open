import { useState } from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(anecdote))
        setAnecdote('')
    }

    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={ addAnecdote }>
                <div>
                    <input value={ anecdote }  onChange={({ target }) => setAnecdote(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default AnecdoteForm