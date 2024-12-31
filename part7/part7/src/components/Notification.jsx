const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    
    return (
        <div style={{ border: 'solid', padding: 10, borderWidth: 1, margin: 5 }}>
            {message}
        </div>
    )
}

export default Notification