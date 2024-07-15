const Persons = ({ persons }) => {
    if (persons.length === 0) {
        return <p>No persons to show</p>
    }
    return (
        <ul>
            {persons.map(person => <li key={person.id}>{person.name} - {person.phone}</li>)}
        </ul>
    )
}

export default Persons