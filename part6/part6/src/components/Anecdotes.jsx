import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ a, handleVote }) => {
    return (
        <div>
            <div>
                { '"' + a.content + '"' }
            </div>
            <div>
                Has { a.votes }.
                <button onClick={ handleVote }>Vote</button>
            </div>
            <br />
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes_list = [...useSelector(({ anecdotes, filter }) => {
        if (filter === 'ALL') {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })]
    const voteHandler = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted for '${ content }'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <>
            <h2>Anecdotes</h2>
            { (anecdotes_list.length > 0)
                ? anecdotes_list.sort((a, b) => b.votes - a.votes).map(a =>
                    <Anecdote
                        key={ a.id }
                        a={ a }
                        handleVote={ () => voteHandler(a.id, a.content) }
                    />)
                : <p>No anecdotes found</p>
            }
        </>
    )
}

export default Anecdotes