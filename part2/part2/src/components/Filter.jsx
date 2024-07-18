const Filter = ({ state, setState, onChangeHandler }) => {
    return (
        <div>
            Filter shown with <input type="text" value={state} placeholder="Search..." onChange={(event) => onChangeHandler(event, setState)} />
        </div>
    )
}

export default Filter