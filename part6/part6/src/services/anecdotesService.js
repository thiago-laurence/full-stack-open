import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const getAnecdotes = async () => {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
}

export const createAnecdote = async (anecdote) => {
    const response = await axios.post(`${baseUrl}/anecdotes`, anecdote)
    return response.data
}

export const updateAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, anecdote)
    return response.data
}