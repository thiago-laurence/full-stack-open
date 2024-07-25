import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                        type="text"
                        value={ username }
                        name="Username"
                        data-testid="username"
                        id="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                        type="password"
                        value={ password }
                        name="Password"
                        data-testid="password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm