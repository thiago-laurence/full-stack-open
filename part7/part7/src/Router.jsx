import { Routes, Route } from 'react-router-dom'

const Router = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<props.Home />} />
                <Route path="/about" element={<props.About />} />
                <Route path="/create" element={<props.Create />} />
                <Route path="/anecdotes/:id" element={<props.Item />} />
            </Routes>
        </>
    )
}

export default Router