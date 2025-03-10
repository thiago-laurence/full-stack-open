import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show
  })
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading books...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap(book => book.genres))]
  const filteredBooks = genre ? books.filter(book => book.genres.includes(genre)) : books

  return (
    <div>
      <h2>books</h2>

      <div>
        <label>Filter by genre: </label>
        <select value={ genre } onChange={ (e) => setGenre(e.target.value) }>
          <option value="">All genres</option>
          {
            genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))
          }
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {
            filteredBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td>{a.genres.join(", ")}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books
