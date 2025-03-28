import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from "../services/anecdotesService"
import { useNotificationDispatch } from '../contexts/NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'SET_NOTIFICATION', payload: `a new anectode '${ content }' is created` })
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={ onCreate }>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
