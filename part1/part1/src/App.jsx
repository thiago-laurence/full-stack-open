import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({count, text}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total.value === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={good.name} count={good.value} />
          <StatisticLine text={neutral.name} count={neutral.value} />
          <StatisticLine text={bad.name} count={bad.value} />
          <StatisticLine text={total.name} count={total.value} />
          <StatisticLine text={average.name} count={average.value} />
          <StatisticLine text={positive.name} count={positive.value + " %"} />
        </tbody>
      </table>
    </>
  )
}

const Display = ({title, text}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState({ name: "Good", value: 0 })
  const [neutral, setNeutral] = useState({ name: "Neutral", value: 0 })
  const [bad, setBad] = useState({ name: "Bad", value: 0 })
  const [total, setTotal] = useState({ name: "Total", value: good.value + neutral.value + bad.value })
  const [average, setAverage] = useState({ name: "Average", value: (good.value - bad.value) / total.value })
  const [positive, setPositive] = useState({ name: "Positive", value: (good.value / total.value) * 100 })

  const updateStatistics = (good, bad, neutral) => {
    const newTotal = good + bad + neutral
    setTotal({ ...total, value: good + neutral + bad })
    setAverage({ ...average, value: (good - bad) / newTotal })
    setPositive({ ...positive, value: (good / newTotal) * 100 })
  }
  const handleFeedback = (state, setState) => () => {
    const newValue = state.value + 1
    setState({ ...state, value: newValue })
    updateStatistics(
      state === good ? newValue : good.value,
      state === bad ? newValue : bad.value,
      state === neutral ? newValue : neutral.value
    )
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={handleFeedback(good, setGood)} text={good.name} />
      <Button onClick={handleFeedback(neutral, setNeutral)} text={neutral.name} />
      <Button onClick={handleFeedback(bad, setBad)} text={bad.name} />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />

      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Next anecdote" />
      <Button onClick={handleVote} text="Vote" />
      <Display title="Anecdote of the day" text={"\"" + anecdotes[selected] + "\" with " + votes[selected] + " votes."} />

      <Display title="Anecdote with most votes" text={"\"" + anecdotes[votes.indexOf(Math.max(...votes))] + "\" has " + Math.max(...votes) + " votes."} />
    </>
  )
}

export default App