import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, name }) => <button onClick={ handleClick }>{ name }</button>

const Statistic = ({ text, value }) => <tr><td>{ text }</td><td>{ value }</td></tr>

const Statistics = ({ title, good, neutral, bad}) => {

  const totalCount = () => good + neutral + bad
  const average = () => (good + bad * -1) / totalCount()
  const goodPercentage = () => (good / totalCount() * 100) + ' %'

  if ( good || neutral || bad) {
    return (
      <div>
        <h1>{ title }</h1>
        <table>
          <tbody>
            <Statistic text={ "good" } value={ good } />
            <Statistic text={ "neutral" } value={ neutral } />
            <Statistic text={ "bad" } value={ bad } />
            <Statistic text={ "all" } value={ totalCount() } />
            <Statistic text={ "average" } value={ average() } />
            <Statistic text={ "positive" } value={ goodPercentage() } />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>{ title }</h1>
      No feedback given
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandlerGood = () => setGood(good + 1)
  const clickHandlerNeutral = () => setNeutral(neutral + 1)
  const clickHandlerBad = () => setBad(bad + 1)

  const title = "give feedback"
  const title2 = "statistics"

  return (
    <div>
      <h1>{ title }</h1>
      <Button handleClick={ clickHandlerGood } name={ "good" } />
      <Button handleClick={ clickHandlerNeutral } name={ "neutral" } />
      <Button handleClick={ clickHandlerBad } name={ "bad" } />
      <Statistics title={ title2 } good={ good } neutral={ neutral } bad={ bad } />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)