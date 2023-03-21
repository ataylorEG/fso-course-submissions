import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>no feedback given</p>;
  }
  return (
    <div>
      <h1>statistics</h1>
      <table style={{ borderCollapse: 'collapse', border: 'none' }}>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine
            text="average"
            value={(good * 1 + bad * -1) / (good + bad + neutral)}
          />
          <StatisticLine
            text="positive"
            value={(100 * good) / (good + bad + neutral)}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ border: 'none', paddingRight: '1rem' }}>{text}</td>
      <td style={{ border: 'none' }}>
        {text === 'positive' ? `${value} %` : value}
      </td>
    </tr>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>

      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App