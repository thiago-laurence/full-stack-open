import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={ [notification, notificationDispatch] }>
            { children }
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const context = useContext(NotificationContext)
    return context[0]
}

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext)
    return context[1]
}

export default NotificationContext