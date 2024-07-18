const Persons = ({ persons, removeHandler }) => {
    if (persons.length === 0) {
        return <p>No persons to show</p>
    }
    return (
        <ul>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name} - {person.number}
                    <button onClick={() => removeHandler(person.id)}>Delete</button>        
                </li>
            )}
        </ul>
    )
}

export default Persons