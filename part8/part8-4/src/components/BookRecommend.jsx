import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const BookRecommend = ({ show }) => {
    const resultMe = useQuery(ME, {
        skip: !show
    })
    const resultBooks = useQuery(ALL_BOOKS, {
        skip: !show || !resultMe.data,
        variables: { genre: resultMe.data?.me?.favoriteGenre }
    })

    if (!show) {
        return null
    }
    if (resultBooks.loading || resultMe.loading) {
        return <div>loading data...</div>
    }
    if (!resultMe.data || !resultBooks.data) {
        return <div>error loading data...</div>
    }

    const books = resultBooks.data.allBooks
    const me = resultMe.data.me
    const filteredBooks = books.filter(book => book.genres.includes(me.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre "{ me.favoriteGenre }"</p>
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

export default BookRecommend