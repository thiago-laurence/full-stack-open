
const Anecdote = ({ anecdote }) => {
    if (!anecdote) {
        return (
            <div>
                <h2>404</h2>
                <div>Anecdote not found</div>
            </div>
        )
    }

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div>has {anecdote.votes} votes</div>
            <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote