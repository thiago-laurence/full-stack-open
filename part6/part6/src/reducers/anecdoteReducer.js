import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    refreshAnecdote(state, action){
      const changedAnecdote = { ...action.payload }
      return state.map(a => a.id !== action.payload.id ? a : changedAnecdote)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { refreshAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (id, newObject) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch(refreshAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer