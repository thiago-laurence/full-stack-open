import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const [filter, setFilter] = useState('')
    const dispatch = useDispatch()
    const handleChange = (filter) => {
      setFilter(filter)
      dispatch(changeFilter(filter))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={ style }>
        Filter <input value={ filter } onChange={ ({ target }) => handleChange(target.value) } />
      </div>
    )
  }
  
export default Filter