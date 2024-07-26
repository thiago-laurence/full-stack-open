import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
    const anecdotes_list = useSelector(({ anecdotes, filter }) => {
        if (filter === 'ALL') {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })
    
    return (
        <>
            <h2>Anecdotes</h2>
            { (anecdotes_list.length > 0) 
                ? anecdotes_list.sort((a, b) => b.votes - a.votes).map(a =>
                    <Anecdote
                        key={ a.id }
                        a={ a }
                        handleVote={ () => dispatch(vote(a.id)) }
                    />)
                : <p>No anecdotes found</p>
            }
        </>
    )
}

export default Anecdotes