import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        viewNotification(state, action){
            return action.payload
        },
        clearNotification(state){
            return ''
        }
    }
})

export const { viewNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return (dispatch) => {
        dispatch(viewNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    }
}

export default notificationSlice.reducer