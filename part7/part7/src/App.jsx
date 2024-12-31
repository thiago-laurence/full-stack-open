import { useState, useEffect } from 'react'
import { useMatch, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Menu from './components/Menu'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import Router from './Router'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const location = useLocation()
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    if (location.state) {
      setNotification(location.state.message)
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [location.state])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === Number(id))

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Router 
        Home={() => <AnecdoteList anecdotes={anecdotes} />} 
        About={About} 
        Create={() => <CreateNew addNew={addNew} />}
        Item={() => <Anecdote anecdote={anecdote} />}
      />
      <Footer />
    </div>
  )
}

export default App
