import { Link } from 'react-router-dom'

const Menu = () => {
    const style = {
      padding: 5,
      border: 'solid',
      borderWidth: 1
    }

    return (
      <div>
        <Link to="/" style={style}>anecdotes</Link>
        <Link to="/create" style={style}>create new</Link>
        <Link to="/about" style={style}>about</Link>
      </div>
    )
  }

export default Menu