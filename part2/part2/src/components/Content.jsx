import Part from './Part'

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}
            <p style={{fontWeight: "bold"}}>
                Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
            </p>
        </div>
    )
}

export default Content