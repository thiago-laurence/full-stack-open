import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"
import Anecdotes from "./components/Anecdotes"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Filter />
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App