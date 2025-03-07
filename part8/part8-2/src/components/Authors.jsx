import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const [year, setYear] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })

  const result = useQuery(ALL_AUTHORS, {
      skip: !props.show
    })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading authors...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(year) } })

    setYear("")
    setName("")
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Author
          <select onChange={({ target }) => setName(target.value)} value={name}>
            <option value="" disabled>Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default Authors
