import { useNotificationValue } from "../contexts/NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null){
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={ style }>
      { notification }   
    </div>
  )
}

export default Notification
