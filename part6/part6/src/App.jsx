import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdotesService'
import { useNotificationDispatch } from './contexts/NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3,
    refetchOnWindowFocus: false
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
    }
  })

  const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET_NOTIFICATION', payload: `anectode '${ anecdote.content }' is voted` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  switch (anecdotesQuery.status){
    case 'pending':
      return <div>Loading anecdotes...</div>
    case 'error':
      return (
        <div>
          <p>anecdote service not available due to problems in server</p>
          <p><strong>Error fetching data: { anecdotesQuery.error.message }</strong></p>
        </div>
      )
    default:
      break
  }

  return (
    <div>
      <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        { anecdotesQuery.data.map(a =>
          <div key={ a.id }>
            <div>
              { '"' + a.content + "'"}
            </div>
            <div>
              Has: { a.votes }.
              <button onClick={ () => handleVote(a) }>vote</button>
            </div>
            <br />
          </div>
        )}
    </div>
  )
}

export default App
