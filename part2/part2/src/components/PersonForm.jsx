const Form = ({ submitHandler, name, number, setName, setNumber, onChangeHandler }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input type="text" placeholder="Type a phone name..." value={name} onChange={(event) => onChangeHandler(event, setName)} />
            </div>
            <div>
                number: <input type="text" placeholder="Type a phone number..." value={number} onChange={(event) => onChangeHandler(event, setNumber)} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default Form