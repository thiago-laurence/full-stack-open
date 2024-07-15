const Form = ({ submitHandler, name, phone, setName, setPhone, onChangeHandler }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={name} onChange={(event) => onChangeHandler(event, setName)} />
            </div>
            <div>
                phone: <input type='number' value={phone} onChange={(event) => onChangeHandler(event, setPhone)} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default Form