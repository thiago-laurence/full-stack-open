const Message = ({ message }) => {
  if (message === null) {
    return null
  }

  const styles = {
    color: message.ok ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  return (
    <div style={ styles }>
      <p>{ message.text }</p>
    </div>
  )
}

export default Message