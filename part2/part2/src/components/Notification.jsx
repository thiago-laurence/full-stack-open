const Notification = ({ message }) => {
    if (message.ok === null) {
        return null
    }

    const notificationStyle = (message.ok) ? {
        color: 'white',
        background: 'green',
        fontSize: 15,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    } : {
        color: 'white',
        background: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={notificationStyle}>
            <p>{message.text}</p>
        </div>
    )
}

export default Notification